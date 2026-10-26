import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SecurityAuditLog, ThreatLevel } from '../../entities/security-audit-log.entity';

export interface AlertPayload {
  ip: string;
  endpoint: string;
  method: string;
  threatLevel: ThreatLevel;
  reason: string;
  userAgent?: string;
  details?: Record<string, any>;
}

@Injectable()
export class SecurityService {
  private readonly logger = new Logger(SecurityService.name);
  private readonly alertCooldowns = new Map<string, number>();
  private readonly COOLDOWN_MS = 5 * 60 * 1000; // 5 phút chống spam Webhook

  constructor(
    @InjectRepository(SecurityAuditLog)
    private readonly securityAuditLogRepo: Repository<SecurityAuditLog>,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Trích xuất địa chỉ IP thực tế từ Request, hỗ trợ proxy của Render (X-Forwarded-For)
   */
  extractRealIp(req: any): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      const firstIp = (typeof forwarded === 'string' ? forwarded : forwarded[0]).split(',')[0].trim();
      if (firstIp) return this.cleanIp(firstIp);
    }
    const realIp = req.headers['x-real-ip'];
    if (realIp) return this.cleanIp(realIp);
    return this.cleanIp(req.ip || req.socket?.remoteAddress || '127.0.0.1');
  }

  private cleanIp(rawIp: string): string {
    if (!rawIp) return '127.0.0.1';
    // Xóa định dạng IPv6 mapped IPv4 ví dụ ::ffff:192.168.1.1
    return rawIp.replace(/^.*:/, '');
  }

  /**
   * Tra cứu vị trí địa lý của IP bằng ip-api.com (bảo đảm timeout 2.5s)
   */
  async lookupLocation(ip: string): Promise<string> {
    if (
      !ip ||
      ip === '127.0.0.1' ||
      ip === 'localhost' ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.16.') ||
      ip.startsWith('172.31.')
    ) {
      return 'Mạng nội bộ / Localhost';
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          return `${data.city || 'Unknown'}, ${data.country || 'Unknown'} (${data.isp || data.org || 'ISP'})`;
        }
      }
    } catch {
      // Bỏ qua lỗi kết nối IP-API để không cản trở flow chính
    }
    return 'Không xác định';
  }

  /**
   * Ghi nhận xâm nhập, lưu vào CSDL và gửi cảnh báo đến Discord Webhook nếu chưa bị giới hạn tần suất
   */
  async logAndAlert(payload: AlertPayload): Promise<void> {
    // 1. Chạy bất đồng bộ ngầm để không ảnh hưởng đến độ phản hồi của người dùng
    setImmediate(async () => {
      try {
        const location = await this.lookupLocation(payload.ip);

        // Lưu vào MySQL
        const logEntry = this.securityAuditLogRepo.create({
          ip_address: payload.ip,
          endpoint: payload.endpoint,
          http_method: payload.method,
          threat_level: payload.threatLevel,
          reason: payload.reason,
          location,
          user_agent: (payload.userAgent || '').substring(0, 500),
        });
        await this.securityAuditLogRepo.save(logEntry);

        // Kiểm tra chống spam gửi Webhook (cooldown 5 phút cho mỗi IP và loại cảnh báo)
        const cooldownKey = `${payload.ip}:${payload.reason}`;
        const lastSent = this.alertCooldowns.get(cooldownKey) || 0;
        const now = Date.now();

        if (now - lastSent < this.COOLDOWN_MS) {
          this.logger.debug(`Bỏ qua gửi Discord Webhook cho ${cooldownKey} do đang trong thời gian chờ cooldown.`);
          return;
        }

        this.alertCooldowns.set(cooldownKey, now);

        // Gửi Discord Webhook
        await this.sendDiscordAlert(payload, location);
      } catch (err) {
        this.logger.error(`Lỗi trong tiến trình ghi log bảo mật: ${err.message}`, err.stack);
      }
    });
  }

  /**
   * Gửi thông báo dạng Embed sang Discord Webhook
   */
  async sendDiscordAlert(payload: AlertPayload, location: string): Promise<boolean> {
    const webhookUrl = this.configService.get<string>('DISCORD_WEBHOOK_URL') || process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      this.logger.warn('Chưa cấu hình DISCORD_WEBHOOK_URL. Cảnh báo bảo mật chỉ được ghi vào CSDL.');
      return false;
    }

    const colorMap: Record<ThreatLevel, number> = {
      CRITICAL: 0xff0000, // Đỏ rực
      HIGH: 0xff4500,     // Cam đỏ
      MEDIUM: 0xffa500,   // Vàng cam
      LOW: 0x3498db,      // Xanh dương
    };

    const color = colorMap[payload.threatLevel] || 0xffa500;

    const embed = {
      title: `🚨 [CẢNH BÁO BẢO MẬT] Phát hiện truy cập khả nghi!`,
      description: `Hệ thống vừa phát hiện và chặn một yêu cầu đáng ngờ trên ứng dụng.`,
      color,
      fields: [
        {
          name: '🌐 Địa chỉ IP',
          value: `\`${payload.ip}\``,
          inline: true,
        },
        {
          name: '📍 Vị trí / Nhà mạng',
          value: location || 'Không rõ',
          inline: true,
        },
        {
          name: '⚡ Mức độ đe dọa',
          value: `**${payload.threatLevel}**`,
          inline: true,
        },
        {
          name: '⚠️ Nguyên nhân cảnh báo',
          value: payload.reason,
          inline: false,
        },
        {
          name: '🔗 Đường dẫn mục tiêu',
          value: `\`${payload.method} ${payload.endpoint}\``,
          inline: false,
        },
        {
          name: '💻 User-Agent',
          value: `\`${(payload.userAgent || 'Trống').substring(0, 150)}\``,
          inline: false,
        },
      ],
      footer: {
        text: `Idol Showdown Wiki Security Monitor • Render Cloud`,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Wiki Security Sentinel',
          avatar_url: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f6e1.png',
          embeds: [embed],
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        this.logger.error(`Gửi Discord Webhook thất bại: status ${res.status} ${res.statusText}`);
        return false;
      }
      return true;
    } catch (err) {
      this.logger.error(`Lỗi khi kết nối Discord Webhook: ${err.message}`);
      return false;
    }
  }

  /**
   * Truy vấn danh sách log bảo mật gần nhất cho màn hình Admin
   */
  async getRecentLogs(limit: number = 50): Promise<SecurityAuditLog[]> {
    return this.securityAuditLogRepo.find({
      order: { created_at: 'DESC' },
      take: Math.min(limit, 100),
    });
  }

  /**
   * Hàm kiểm thử kết nối Discord Webhook từ giao diện Admin
   */
  async testDiscordWebhook(testIp: string = '127.0.0.1'): Promise<{ success: boolean; message: string }> {
    const webhookUrl = this.configService.get<string>('DISCORD_WEBHOOK_URL') || process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return {
        success: false,
        message: 'Biến môi trường DISCORD_WEBHOOK_URL chưa được cấu hình!',
      };
    }

    const testPayload: AlertPayload = {
      ip: testIp,
      endpoint: '/api/admin/security/test-webhook',
      method: 'POST',
      threatLevel: 'LOW',
      reason: 'Kiểm tra kết nối Discord Webhook từ Quản trị viên',
      userAgent: 'TestClient/1.0 (Admin Manual Test)',
    };

    const location = await this.lookupLocation(testIp);
    const success = await this.sendDiscordAlert(testPayload, location);

    if (success) {
      return { success: true, message: 'Gửi thông báo kiểm tra đến Discord Webhook thành công!' };
    } else {
      return { success: false, message: 'Gửi thất bại. Vui lòng kiểm tra lại URL Discord Webhook.' };
    }
  }
}

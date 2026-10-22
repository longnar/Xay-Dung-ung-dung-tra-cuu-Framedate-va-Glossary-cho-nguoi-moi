"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const security_audit_log_entity_1 = require("../../entities/security-audit-log.entity");
let SecurityService = SecurityService_1 = class SecurityService {
    constructor(securityAuditLogRepo, configService) {
        this.securityAuditLogRepo = securityAuditLogRepo;
        this.configService = configService;
        this.logger = new common_1.Logger(SecurityService_1.name);
        this.alertCooldowns = new Map();
        this.COOLDOWN_MS = 5 * 60 * 1000;
    }
    extractRealIp(req) {
        const forwarded = req.headers['x-forwarded-for'];
        if (forwarded) {
            const firstIp = (typeof forwarded === 'string' ? forwarded : forwarded[0]).split(',')[0].trim();
            if (firstIp)
                return this.cleanIp(firstIp);
        }
        const realIp = req.headers['x-real-ip'];
        if (realIp)
            return this.cleanIp(realIp);
        return this.cleanIp(req.ip || req.socket?.remoteAddress || '127.0.0.1');
    }
    cleanIp(rawIp) {
        if (!rawIp)
            return '127.0.0.1';
        return rawIp.replace(/^.*:/, '');
    }
    async lookupLocation(ip) {
        if (!ip ||
            ip === '127.0.0.1' ||
            ip === 'localhost' ||
            ip.startsWith('192.168.') ||
            ip.startsWith('10.') ||
            ip.startsWith('172.16.') ||
            ip.startsWith('172.31.')) {
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
        }
        catch {
        }
        return 'Không xác định';
    }
    async logAndAlert(payload) {
        setImmediate(async () => {
            try {
                const location = await this.lookupLocation(payload.ip);
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
                const cooldownKey = `${payload.ip}:${payload.reason}`;
                const lastSent = this.alertCooldowns.get(cooldownKey) || 0;
                const now = Date.now();
                if (now - lastSent < this.COOLDOWN_MS) {
                    this.logger.debug(`Bỏ qua gửi Discord Webhook cho ${cooldownKey} do đang trong thời gian chờ cooldown.`);
                    return;
                }
                this.alertCooldowns.set(cooldownKey, now);
                await this.sendDiscordAlert(payload, location);
            }
            catch (err) {
                this.logger.error(`Lỗi trong tiến trình ghi log bảo mật: ${err.message}`, err.stack);
            }
        });
    }
    async sendDiscordAlert(payload, location) {
        const webhookUrl = this.configService.get('DISCORD_WEBHOOK_URL') || process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            this.logger.warn('Chưa cấu hình DISCORD_WEBHOOK_URL. Cảnh báo bảo mật chỉ được ghi vào CSDL.');
            return false;
        }
        const colorMap = {
            CRITICAL: 0xff0000,
            HIGH: 0xff4500,
            MEDIUM: 0xffa500,
            LOW: 0x3498db,
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
        }
        catch (err) {
            this.logger.error(`Lỗi khi kết nối Discord Webhook: ${err.message}`);
            return false;
        }
    }
    async getRecentLogs(limit = 50) {
        return this.securityAuditLogRepo.find({
            order: { created_at: 'DESC' },
            take: Math.min(limit, 100),
        });
    }
    async testDiscordWebhook(testIp = '127.0.0.1') {
        const webhookUrl = this.configService.get('DISCORD_WEBHOOK_URL') || process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) {
            return {
                success: false,
                message: 'Biến môi trường DISCORD_WEBHOOK_URL chưa được cấu hình!',
            };
        }
        const testPayload = {
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
        }
        else {
            return { success: false, message: 'Gửi thất bại. Vui lòng kiểm tra lại URL Discord Webhook.' };
        }
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = SecurityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(security_audit_log_entity_1.SecurityAuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], SecurityService);
//# sourceMappingURL=security.service.js.map
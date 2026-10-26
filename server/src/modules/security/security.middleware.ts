import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SecurityService } from './security.service';
import { ThreatLevel } from '../../entities/security-audit-log.entity';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private readonly securityService: SecurityService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const rawUrl = (req.originalUrl || req.url || '').toLowerCase();
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    const method = req.method;
    const ip = this.securityService.extractRealIp(req);

    // 1. Kiểm tra các mẫu quét lỗ hổng và file nhạy cảm phổ biến (CRITICAL)
    const sensitiveFileProbes = [
      '/.env',
      '/.git',
      '/wp-admin',
      '/wp-login',
      '/xmlrpc.php',
      '/phpmyadmin',
      '/pma',
      '/.aws',
      '/config.json',
      '/web.config',
      '/actuator',
      '/cgi-bin',
      '/solr',
      '/telescope',
      '/.vscode',
      '/dump.sql',
      '/backup.sql',
      '/database.sql',
    ];

    for (const probe of sensitiveFileProbes) {
      if (rawUrl.includes(probe)) {
        this.securityService.logAndAlert({
          ip,
          endpoint: req.originalUrl || req.url,
          method,
          threatLevel: 'CRITICAL',
          reason: `Dò quét file nhạy cảm / hệ thống (${probe})`,
          userAgent: req.headers['user-agent'] as string,
        });

        return res.status(403).json({
          statusCode: 403,
          error: 'Forbidden',
          message: 'Truy cập bị từ chối do vi phạm quy tắc an ninh.',
        });
      }
    }

    // 2. Kiểm tra các công cụ quét tự động / hacker scanner bots (HIGH)
    const maliciousBots = [
      'sqlmap',
      'nikto',
      'nmap',
      'masscan',
      'zgrab',
      'acunetix',
      'dirbuster',
      'gobuster',
      'wpscan',
    ];

    for (const bot of maliciousBots) {
      if (userAgent.includes(bot)) {
        this.securityService.logAndAlert({
          ip,
          endpoint: req.originalUrl || req.url,
          method,
          threatLevel: 'HIGH',
          reason: `Phát hiện bot rà quét tự động (User-Agent: ${bot})`,
          userAgent: req.headers['user-agent'] as string,
        });

        return res.status(403).json({
          statusCode: 403,
          error: 'Forbidden',
          message: 'Trình thu thập dữ liệu tự động bị chặn.',
        });
      }
    }

    // 3. Kiểm tra Path Traversal & Ký tự độc hại trong URL (HIGH)
    if (rawUrl.includes('../') || rawUrl.includes('..\\') || rawUrl.includes('%2e%2e%2f') || rawUrl.includes('%2e%2e/')) {
      this.securityService.logAndAlert({
        ip,
        endpoint: req.originalUrl || req.url,
        method,
        threatLevel: 'HIGH',
        reason: 'Thử nghiệm Path Traversal (Directory Traversal)',
        userAgent: req.headers['user-agent'] as string,
      });

      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Định dạng đường dẫn không hợp lệ.',
      });
    }

    // 4. Kiểm tra injection nguy hiểm trong Query parameters (HIGH)
    const rawQuery = decodeURIComponent(req.url);
    const sqlInjectionPatterns = [
      /union\s+select/i,
      /order\s+by\s+\d+/i,
      /;\s*drop\s+table/i,
      /--\s*$/i,
      /'\s+or\s+'1'='1/i,
      /<script[\s>]/i,
    ];

    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(rawQuery)) {
        this.securityService.logAndAlert({
          ip,
          endpoint: req.originalUrl || req.url,
          method,
          threatLevel: 'HIGH',
          reason: `Phát hiện dấu hiệu tấn công SQL Injection / XSS trong query`,
          userAgent: req.headers['user-agent'] as string,
        });

        return res.status(403).json({
          statusCode: 403,
          error: 'Forbidden',
          message: 'Yêu cầu bị từ chối do chứa ký tự không an toàn.',
        });
      }
    }

    next();
  }
}

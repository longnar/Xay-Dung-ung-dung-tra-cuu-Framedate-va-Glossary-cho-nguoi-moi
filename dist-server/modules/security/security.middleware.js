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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMiddleware = void 0;
const common_1 = require("@nestjs/common");
const security_service_1 = require("./security.service");
let SecurityMiddleware = class SecurityMiddleware {
    constructor(securityService) {
        this.securityService = securityService;
    }
    use(req, res, next) {
        const rawUrl = (req.originalUrl || req.url || '').toLowerCase();
        const userAgent = (req.headers['user-agent'] || '').toLowerCase();
        const method = req.method;
        const ip = this.securityService.extractRealIp(req);
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
                    userAgent: req.headers['user-agent'],
                });
                return res.status(403).json({
                    statusCode: 403,
                    error: 'Forbidden',
                    message: 'Truy cập bị từ chối do vi phạm quy tắc an ninh.',
                });
            }
        }
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
                    userAgent: req.headers['user-agent'],
                });
                return res.status(403).json({
                    statusCode: 403,
                    error: 'Forbidden',
                    message: 'Trình thu thập dữ liệu tự động bị chặn.',
                });
            }
        }
        if (rawUrl.includes('../') || rawUrl.includes('..\\') || rawUrl.includes('%2e%2e%2f') || rawUrl.includes('%2e%2e/')) {
            this.securityService.logAndAlert({
                ip,
                endpoint: req.originalUrl || req.url,
                method,
                threatLevel: 'HIGH',
                reason: 'Thử nghiệm Path Traversal (Directory Traversal)',
                userAgent: req.headers['user-agent'],
            });
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Định dạng đường dẫn không hợp lệ.',
            });
        }
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
                    userAgent: req.headers['user-agent'],
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
};
exports.SecurityMiddleware = SecurityMiddleware;
exports.SecurityMiddleware = SecurityMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityMiddleware);
//# sourceMappingURL=security.middleware.js.map
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
export declare class SecurityService {
    private readonly securityAuditLogRepo;
    private readonly configService;
    private readonly logger;
    private readonly alertCooldowns;
    private readonly COOLDOWN_MS;
    constructor(securityAuditLogRepo: Repository<SecurityAuditLog>, configService: ConfigService);
    extractRealIp(req: any): string;
    private cleanIp;
    lookupLocation(ip: string): Promise<string>;
    logAndAlert(payload: AlertPayload): Promise<void>;
    sendDiscordAlert(payload: AlertPayload, location: string): Promise<boolean>;
    getRecentLogs(limit?: number): Promise<SecurityAuditLog[]>;
    testDiscordWebhook(testIp?: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

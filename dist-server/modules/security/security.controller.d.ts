import { SecurityService } from './security.service';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    getLogs(limit?: string): Promise<{
        status: string;
        total: number;
        data: import("../../entities/security-audit-log.entity").SecurityAuditLog[];
    }>;
    testWebhook(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}

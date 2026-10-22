export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export declare class SecurityAuditLog {
    id: number;
    ip_address: string;
    endpoint: string;
    http_method: string;
    threat_level: ThreatLevel;
    reason: string;
    location: string;
    user_agent: string;
    created_at: Date;
}

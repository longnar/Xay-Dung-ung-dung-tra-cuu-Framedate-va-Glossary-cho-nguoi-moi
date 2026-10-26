import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

@Entity('security_audit_logs')
export class SecurityAuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ip_address', length: 50 })
  ip_address: string;

  @Column({ length: 255 })
  endpoint: string;

  @Column({ name: 'http_method', length: 10 })
  http_method: string;

  @Column({
    name: 'threat_level',
    type: 'enum',
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM',
  })
  threat_level: ThreatLevel;

  @Column({ length: 255 })
  reason: string;

  @Column({ length: 150, nullable: true })
  location: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  user_agent: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

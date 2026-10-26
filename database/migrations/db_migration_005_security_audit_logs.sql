-- Migration 005: Security Audit Logs for Discord Alert & Intrusion Detection
CREATE TABLE IF NOT EXISTS `security_audit_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ip_address` VARCHAR(50) NOT NULL,
  `endpoint` VARCHAR(255) NOT NULL,
  `http_method` VARCHAR(10) NOT NULL,
  `threat_level` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
  `reason` VARCHAR(255) NOT NULL,
  `location` VARCHAR(150) NULL DEFAULT NULL,
  `user_agent` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_security_logs_ip` (`ip_address`),
  KEY `idx_security_logs_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

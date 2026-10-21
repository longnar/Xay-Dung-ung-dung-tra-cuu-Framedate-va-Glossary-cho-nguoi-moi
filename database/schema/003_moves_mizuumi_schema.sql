-- Migration bổ sung các trường thuộc tính Frame Data theo chuẩn Mizuumi Wiki
USE idol_showdown_wiki;

ALTER TABLE character_moves 
ADD COLUMN IF NOT EXISTS version VARCHAR(50) DEFAULT NULL AFTER CHAR_MOVE,
ADD COLUMN IF NOT EXISTS move_type ENUM('normal', 'command_normal', 'throw', 'special', 'super') DEFAULT 'normal' AFTER CHAR_MOVE,
ADD COLUMN IF NOT EXISTS guard VARCHAR(50) DEFAULT 'Mid' AFTER DAMAGE,
ADD COLUMN IF NOT EXISTS properties TEXT DEFAULT NULL AFTER INVULNERABILITY,
ADD COLUMN IF NOT EXISTS description TEXT DEFAULT NULL AFTER properties,
ADD COLUMN IF NOT EXISTS sprite_url VARCHAR(255) DEFAULT NULL AFTER description;

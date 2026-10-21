-- Migration: Add hitbox_url and move metadata columns to character_moves

ALTER TABLE character_moves
ADD COLUMN hitbox_url VARCHAR(255) NULL AFTER INVULNERABILITY,
ADD COLUMN hitbox_caption VARCHAR(255) NULL AFTER hitbox_url,
ADD COLUMN move_type VARCHAR(50) NULL DEFAULT 'normal' AFTER hitbox_caption,
ADD COLUMN guard VARCHAR(50) NULL DEFAULT 'Mid' AFTER move_type,
ADD COLUMN version VARCHAR(100) NULL AFTER guard,
ADD COLUMN properties TEXT NULL AFTER version,
ADD COLUMN description TEXT NULL AFTER properties;

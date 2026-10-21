-- Table: news_patches
CREATE TABLE IF NOT EXISTS news_patches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    version VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    content MEDIUMTEXT NOT NULL,
    is_major TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed initial patch data
INSERT INTO news_patches (id, title, version, release_date, is_major, content)
VALUES 
(1, 'Balance Patch v5.2.0', 'v5.2.0', '2024-05-15', 1, 'He thong (System)\n  - Blockstun buffer tang tu 4 -> 5.\n  - Universal overhead: Hien tai la -5 tren block.\n  - Superchat reversal: Gio day se kich hoat IPS.\n  - Tat ca cac don EX deu bi tang thoi gian meter penalty them 1 giay.\n\nNhan vat (Characters)\nFubuki\n  - 4H: Tang recovery them 5.\n  - 236S: Tang startup them 2.\nSuisei\n  - 5H: Giam startup di 2.\n  - 214M: Sat thuong tang tu 30 -> 60.'),
(2, 'Patch v5.1.12', 'v5.1.12', '2024-04-02', 0, 'Sua loi he thong (Hotfixes)\n  - Sua loi am thanh lap vo han khi don Superchat ket thuc dung luc tran dau hoa.\n  - Toi uu hoa hieu nang render tuyet roi cua Fubuki.\n  - Sua loi desync trong Rollback Netcode.'),
(3, 'Patch v5.1.11', 'v5.1.11', '2024-03-18', 0, 'Dieu chinh nhan vat (Character Tuning)\nBotan\n  - Sua loi hoat anh nem luu dan bi tre 2 frames.\nAyame\n  - Can bang lai thoi gian hoi chieu cua Quy luot.')
ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content);

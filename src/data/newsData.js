// Du lieu cac ban cap nhat (khong su dung bieu tuong/icon/emoji)
export const INITIAL_NEWS_PATCHES = [
  {
    id: 1,
    version: 'v5.2.0',
    title: 'Balance Patch v5.2.0',
    release_date: '2024-05-15',
    is_major: 1,
    content: `He thong (System)
  - Blockstun buffer tang tu 4 -> 5.
  - Universal overhead: Hien tai la -5 tren block.
  - Superchat reversal: Gio day se kich hoat IPS (Infinite Prevention System - He thong chong combo vo tan).
  - Gan nhu tat ca cac don light normals gio day se bi giam luong meter gain khi bi block. Cac truong hop ngoai le se duoc ghi chu o phan lien quan.
  - Tat ca cac don EX (1-bar) deu bi tang thoi gian meter penalty them 1 giay.
  - Burst:
    - Tai nguyen yeu cau de burst gio day duoc chuan hoa dua tren luong mau cua nhan vat. Tai nguyen yeu cau hien tai se tinh theo ty le phan tram (%).
    - Burst gio day khong the bi burst nguoc lai.
    - Neutral burst gio day se cung cap 90 superchat (tuong duong 3 bars).

Nhan vat (Characters)
Fubuki
  - 5M: O frame thu 7, giam tam danh cua hitbox. Tu frame thu 8 tro di, hitbox tro lai nhu cu.
  - 4H: Tang recovery them 5.
  - 214L/LSSR: Tang recovery them 5.
  - 22H: Tang recovery them 7.
  - 236S: Tang startup them 2.

Korone
  - 5M: O frame thu 7, giam tam danh cua hitbox. Tu frame thu 8 tro di, hitbox tro lai nhu cu.
  - 2M: Tang pushback khi bi block.
  - 22L: Giam vertical knockback doi voi nhung doi thu dang dung tren mat dat.
  - 22H: Giam sat thuong tu 160 -> 140.

Sora
  - 22L:
    - Giam nhe chieu cao cua don launch (hat tung).
    - Mot khi da o tren khong, gio day co the dieu huong (drift) bang cac nut nhap trai/phai.
  - 236S: Them mot hitbox o ngay phia tren dau cua Sora.

Suisei
  - 5L/2L: Duoc mien tru khoi viec bi giam meter gain cua don light normal.
  - 2M: Tang attack level tu 1 -> 2.
  - 5H: Giam startup di 2.
  - 3H: Tang blockstun them 2.
  - 236H: Giam startup cua armor tu 11 -> 7.
  - 214M: Sat thuong tang tu 30 -> 60.
  - 214H: Tang thoi gian ton tai cua projectile them 60 frames.
  - 22S:
    - Khong con khoa Suisei khoi viec cancel cac chieu thuc khac khi chieu nay duoc su dung.
    - Ban them cac dac tinh bo sung khi duoc cancel tu Dash va Backdash.
    - kyou mo kawaii.

Ayame
  - 3H: Gio day se lao ve phia truoc (advances). Giam blockstun.
  - 236L: Tang recovery them 4.
  - 236M: Tang recovery them 8.
  - 214H:
    - Giam tam bay xa (travel range).
    - Giam startup cua projectile invuln tu 7 -> 5.
  - 22H: Giam sat thuong tu 180 -> 160.
  - 22S: Cac bong ma gio day se bien mat neu Ayame bi trung burst.

Coco
  - Fire: Gio day ton tai lau hon gap 2 lan.
  - Backdash: Giam thoi gian invuln di 1, tang recovery them 2.
  - 3H: Tang startup them 2.
  - 214L: Tang startup them 2, tang recovery them 3.
  - 214M:
    - Giam nhe tam danh.
    - Dieu chinh hieu ung chuyen dong de nhin ro rang truc quan hon khi va cham voi doi thu.
  - 214H: Giam blockstun di 7.
  - 214G: Giam ty le scaling tu 0.5x -> 0.25x.
  - 22G: Tang recovery khi bi whiff.
  - 22S:
    - Gio day ban 1 superchat ngay lan dau su dung.
    - Ban 6 superchat sau moi 25 frames giu nut bam.
    - Giam startup cua projectile invuln tu 14 -> 10.
  - 236S: Tang startup them 2.

Aki
  - Grab: Sua loi ky thuat hoan doi vi tri ben man hinh.
  - 5H: Giam blockstun di 2, giam knockback khi bi block o don danh dau tien.
  - 6M: Giam hieu ung keo hut doi thu vao khi bi block.
  - j.H: Them mot hitbox phu nam o phia duoi trong nhung active frames muon hon.
  - 236M: Dieu chinh lai goc danh va diem xuat hien, tang attack level them 2.
  - 214M: Dieu chinh lai goc danh va diem xuat hien, khong con bi whiff voi doi thu ngoi.
  - [2]8L: Giam recovery di 5.

Botan
  - Jump: Dieu chinh lai hurtbox.
  - 5H: Tang attack level them 2, tang horizontal knockback khi bi block.

Pekora
  - 214M: Giam sat thuong tu 120 xuong 80.
  - 22M: Sua loi bug khi projectile gay ra trang thai air tech ngay khi vua duoc trieu hoi.
  - j.S: Tang horizontal hurtbox.

Ollie
  - Dash: Giam startup tu 7 -> 4.
  - 5H: Tang kich thuoc upper hitbox, tang vertical juggle knockback.
  - j.2S: Thoi gian khung khi tiep dat giam tu 5 -> 0.
  - j.M: Tang thoi gian untech time.
  - 236L: Dot song thu hai bi -2 blockstun, dot song thu ba bi -4 blockstun.
  - 236M/H: Tang hitstun va blockstun them 5.
  - 214M: Khung armor xuat hien som hon 1 frame.
  - 22L/M: Giam kich thuoc lower hurtbox.
  - j.214L: Attack level cua tat ca cac don danh gio day co dinh la 1.
  - j.214M: Tang pushback khi bi block.
  - j.214H: Giam startup di 2 frames.

Ina
  - 4M: Gio day co the cancel ra don khac khi danh trung projectile.
  - 3M: Gio day chi co the duoc cancel bang cac don special moves.
  - [4]6L Tako: Gian cach thoi gian giua cac don multihits.
  - [2]8H: Giam sat thuong tu 180 -> 160.
  - 22S: Cac chu Tako gio day ton tai lau hon va khong bien mat khi Ina bi trung don.

Koyori
  - g.2L: Them mot upper hitbox phu o phia tren.
  - g.2M: Tang grounded vertical knockback, sat thuong giam tu 50 -> 45.
  - c.2H: Tang tam danh.
  - g.2H: Sat thuong tang tu 85 -> 110.
  - j.L: Sat thuong giam tu 60 -> 40.
  - j.M: Tang nhe vertical juggle knockback.
  - j.H: Sat thuong tang tu 90 -> 100.
  - Throw: Gio day co the cancel thang sang chieu 5S.
  - c.5S: Giam recovery di 2.
  - g.236L: Tang nhe vertical juggle knockback.
  - c.236M: Tang vertical knockback khi bi block o tren khong.
  - c.236H: Giam startup xuong con 10.
  - g.214L: Tang attack level them 1.
  - 236S: Tang kich thuoc hitbox de bao phu mot chut phan hong sung.

Tro thu (Collabs)
Roboco
  - Off collab: Giam thoi gian ten lua cham dat, tang gian cach giua cac dot, tang kich thuoc hitbox.
Marine
  - Off collab: Khong con bi bien mat khi nguoi trieu hoi bi dinh don.
  - Call in: Sat thuong don 1 la 100, don 2 la 50, don 3 va 4 la 25.
Moona
  - Off collab: Ton tai lau hon them 1 giay.
Kaela
  - Off collab: Hieu ung tang phong thu ty le nghich voi luong mau toi da.
Fauna
  - Off collab: Hoi phuc cham tu tu 100 mau trong 10 giay.
Subaru
  - Off collab: Trieu hoi nhan vat phu chay ra xa, giam sat thuong tu 80 -> 40.
Miko
  - Off collab: Xuat hien o vi tri xa hon ve phia truoc.
Kanata
  - Call-in: Sat thuong giam xuong con 300.`
  },
  {
    id: 2,
    version: 'v5.1.12',
    title: 'Patch v5.1.12',
    release_date: '2024-04-02',
    is_major: 0,
    content: `Sua loi he thong (Hotfixes)
  - Sua loi am thanh lap vo han khi don Superchat ket thuc dung luc tran dau hoa.
  - Toi uu hoa hieu nang render hat hieu ung tuyet roi cua Fubuki tren cac cau hinh may yeu.
  - Sua loi desync trong che do Rollback Netcode khi nguoi choi su dung phim Pause lien tuc.`
  },
  {
    id: 3,
    version: 'v5.1.11',
    title: 'Patch v5.1.11',
    release_date: '2024-03-18',
    is_major: 0,
    content: `Dieu chinh nhan vat (Character Tuning)
Botan
  - Sua loi hoat anh nem luu dan bi tre 2 frames khi thuc hien sau cu nhay lui.
Ayame
  - Can bang lai thoi gian hoi chieu cua Quy luot khi doi thu o trang thai nam san.`
  },
  {
    id: 4,
    version: 'v5.1.10',
    title: 'Patch v5.1.10',
    release_date: '2024-02-28',
    is_major: 0,
    content: `Cap nhat Tro Thu (Collab Adjustments)
  - Marine: Dieu chinh goc roi cua hom kho bau de tranh tinh trang roi ra ngoai mep man hinh.
  - Roboco: Cai thien do chinh xac cua duong ngam tia laser.`
  },
  {
    id: 5,
    version: 'v5.1.9',
    title: 'Patch v5.1.9',
    release_date: '2024-01-20',
    is_major: 0,
    content: `Tinh chinh che do luyen tap (Training Mode)
  - Bo sung tuy chon hien thi Frame Advantage theo thoi gian thuc tren thanh thong so.
  - Them tuy chon gia lap do tre mang tu 1 den 5 frames delay.`
  },
  {
    id: 6,
    version: 'v5.1.8',
    title: 'Patch v5.1.8',
    release_date: '2023-12-15',
    is_major: 0,
    content: `Cap nhat giai dau mua dong (Winter Update)
  - Cap nhat giao dien giai dau Idol Showdown Next Fest.
  - Sua loi giao dien hien thi ten nhan vat trong phong cho nhieu nguoi choi.`
  }
];

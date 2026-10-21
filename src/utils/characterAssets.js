// Anh the Card day du khung nen
import akiArt from '../assets/cards/Aki Promo Art Big.jpg';
import ayameArt from '../assets/cards/Ayame Promo Art Big.jpg';
import bibooArt from '../assets/cards/Biboo Promo Art Big.png';
import botanArt from '../assets/cards/Botan Promo Art Big.jpg';
import cocoArt from '../assets/cards/Coco Promo Art Big.jpg';
import fubukiArt from '../assets/cards/Fubuki Promo Art Big.jpg';
import inaArt from '../assets/cards/Ina Promo Art Big.png';
import koroneArt from '../assets/cards/Korone Promo Art Big.jpg';
import koyoriArt from '../assets/cards/Koyori Promo Art Big.jpg';
import ollieArt from '../assets/cards/Ollie Promo Art Big.png';
import pekoraArt from '../assets/cards/Pekora Promo Art Big 2.png';
import soraArt from '../assets/cards/Sora Promo Art Big.jpg';
import suiseiArt from '../assets/cards/Suisei Promo Art Big.jpg';

// Hinh nhan vat trong suot (Promo Art TP - Transparent PNG) tu folder asset
import akiTp from '../../asset/Aki Promo Art TP.png';
import ayameTp from '../../asset/Ayame Promo Art TP.png';
import bibooTp from '../../asset/Biboo Promo Art TP.png';
import botanTp from '../../asset/Botan Promo Art TP.png';
import cocoTp from '../../asset/Coco Promo Art TP.png';
import fubukiTp from '../../asset/Fubuki Promo Art TP.png';
import inaTp from '../../asset/Ina Promo Art TP.png';
import koroneTp from '../../asset/Korone Promo Art TP.png';
import koyoriTp from '../../asset/Koyori Promo Art TP.png';
import ollieTp from '../../asset/Ollie Promo Art TP.png';
import pekoraTp from '../../asset/Pekora Promo Art TP.png';
import soraTp from '../../asset/Sora Promo Art TP.png';
import suiseiTp from '../../asset/Suisei Promo Art TP.png';

// Hinh nhan vat cat canh (Cutout PNG) tu folder asset
import akiCutout from '../../asset/Aki_Cutout.png';
import ayameCutout from '../../asset/Ayame_Cutout.png';
import bibooCutout from '../../asset/Biboo_Cutout.png';
import botanCutout from '../../asset/Botan_Cutout.png';
import cocoCutout from '../../asset/Coco_Cutout.png';
import fubukiCutout from '../../asset/Fubuki_Cutout.png';
import inaCutout from '../../asset/Ina_Cutout.png';
import koroneCutout from '../../asset/Korone_Cutout.png';
import koyoriCutout from '../../asset/Koyori_Cutout.png';
import ollieCutout from '../../asset/Ollie_Cutout.png';
import pekoraCutout from '../../asset/Pekora_Cutout.png';
import soraCutout from '../../asset/Sora_Cutout.png';
import suiseiCutout from '../../asset/Suisei_Cutout.png';

export const characterArtMap = {
  'Aki': akiArt,
  'Aki Rosenthal': akiArt,
  'Ayame': ayameArt,
  'Nakiri Ayame': ayameArt,
  'Biboo': bibooArt,
  'Koseki Bijou': bibooArt,
  'Koseki Bijou (Biboo)': bibooArt,
  'Botan': botanArt,
  'Shishiro Botan': botanArt,
  'Coco': cocoArt,
  'Kiryu Coco': cocoArt,
  'Fubuki': fubukiArt,
  'Shirakami Fubuki': fubukiArt,
  'Ina': inaArt,
  "Ninomae Ina'nis": inaArt,
  'Korone': koroneArt,
  'Inugami Korone': koroneArt,
  'Koyori': koyoriArt,
  'Hakui Koyori': koyoriArt,
  'Ollie': ollieArt,
  'Kureiji Ollie': ollieArt,
  'Pekora': pekoraArt,
  'Usada Pekora': pekoraArt,
  'Sora': soraArt,
  'Tokino Sora': soraArt,
  'Suisei': suiseiArt,
  'Hoshimachi Suisei': suiseiArt,
};

export const characterTpArtMap = {
  'Aki': akiTp,
  'Aki Rosenthal': akiTp,
  'Ayame': ayameTp,
  'Nakiri Ayame': ayameTp,
  'Biboo': bibooTp,
  'Koseki Bijou': bibooTp,
  'Koseki Bijou (Biboo)': bibooTp,
  'Botan': botanTp,
  'Shishiro Botan': botanTp,
  'Coco': cocoTp,
  'Kiryu Coco': cocoTp,
  'Fubuki': fubukiTp,
  'Shirakami Fubuki': fubukiTp,
  'Ina': inaTp,
  "Ninomae Ina'nis": inaTp,
  'Korone': koroneTp,
  'Inugami Korone': koroneTp,
  'Koyori': koyoriTp,
  'Hakui Koyori': koyoriTp,
  'Ollie': ollieTp,
  'Kureiji Ollie': ollieTp,
  'Pekora': pekoraTp,
  'Usada Pekora': pekoraTp,
  'Sora': soraTp,
  'Tokino Sora': soraTp,
  'Suisei': suiseiTp,
  'Hoshimachi Suisei': suiseiTp,
};

export function getCharacterArt(name) {
  if (!name) return null;
  for (const [key, val] of Object.entries(characterArtMap)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return val;
    }
  }
  return null;
}

// Lay hinh nhan vat trong suot Promo Art TP
export function getCharacterTpArt(name) {
  if (!name) return null;
  for (const [key, val] of Object.entries(characterTpArtMap)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return val;
    }
  }
  return null;
}

export const characterCutoutMap = {
  'Aki': akiCutout,
  'Aki Rosenthal': akiCutout,
  'Ayame': ayameCutout,
  'Nakiri Ayame': ayameCutout,
  'Biboo': bibooCutout,
  'Koseki Bijou': bibooCutout,
  'Koseki Bijou (Biboo)': bibooCutout,
  'Botan': botanCutout,
  'Shishiro Botan': botanCutout,
  'Coco': cocoCutout,
  'Kiryu Coco': cocoCutout,
  'Fubuki': fubukiCutout,
  'Shirakami Fubuki': fubukiCutout,
  'Ina': inaCutout,
  "Ninomae Ina'nis": inaCutout,
  'Korone': koroneCutout,
  'Inugami Korone': koroneCutout,
  'Koyori': koyoriCutout,
  'Hakui Koyori': koyoriCutout,
  'Ollie': ollieCutout,
  'Kureiji Ollie': ollieCutout,
  'Pekora': pekoraCutout,
  'Usada Pekora': pekoraCutout,
  'Sora': soraCutout,
  'Tokino Sora': soraCutout,
  'Suisei': suiseiCutout,
  'Hoshimachi Suisei': suiseiCutout,
};

// Lay hinh nhan vat cat canh Cutout PNG
export function getCharacterCutout(name) {
  if (!name) return null;
  for (const [key, val] of Object.entries(characterCutoutMap)) {
    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
      return val;
    }
  }
  return null;
}


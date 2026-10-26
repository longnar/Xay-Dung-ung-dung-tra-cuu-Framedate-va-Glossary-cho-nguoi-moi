// Import 13 cặp ảnh nút nhân vật
// Lưu ý: Trong file export Figma, các file gắn nhãn "_hover" thực chất là ảnh xám viền khung (chưa chọn)
// còn các file "_default" là ảnh có màu rực rỡ (khi được chọn/hover)
import cocoColor from '../assets/buttons/coco_default.png';
import cocoGray from '../assets/buttons/coco_hover.png';
import inaColor from '../assets/buttons/ina_default.png';
import inaGray from '../assets/buttons/ina_hover.png';
import koroneColor from '../assets/buttons/korone_default.png';
import koroneGray from '../assets/buttons/korone_hover.png';
import soraColor from '../assets/buttons/sora_default.png';
import soraGray from '../assets/buttons/sora_hover.png';
import suiseiColor from '../assets/buttons/suisei_default.png';
import suiseiGray from '../assets/buttons/suisei_hover.png';
import pekoraColor from '../assets/buttons/pekora_default.png';
import pekoraGray from '../assets/buttons/pekora_hover.png';
import ollieColor from '../assets/buttons/ollie_default.png';
import ollieGray from '../assets/buttons/ollie_hover.png';
import bibooColor from '../assets/buttons/biboo_default.png';
import bibooGray from '../assets/buttons/biboo_hover.png';
import fubukiColor from '../assets/buttons/fubuki_default.png';
import fubukiGray from '../assets/buttons/fubuki_hover.png';
import koyoriColor from '../assets/buttons/koyori_default.png';
import koyoriGray from '../assets/buttons/koyori_hover.png';
import akiColor from '../assets/buttons/aki_default.png';
import akiGray from '../assets/buttons/aki_hover.png';
import ayameColor from '../assets/buttons/ayame_default.png';
import ayameGray from '../assets/buttons/ayame_hover.png';
import botanColor from '../assets/buttons/botan_default.png';
import botanGray from '../assets/buttons/botan_hover.png';

// Tọa độ pixel chuẩn xác từ Figma node 782:887 (Group "Hovering Button" 528 x 597px)
export const FIGMA_BUTTON_CLUSTER = {
  width: 528.06,
  height: 597.05,
  buttonWidth: 164.05,
  buttonHeight: 164.05,
};

export const CHARACTER_SELECT_BUTTONS = [
  {
    key: 'coco',
    name: 'Kiryu Coco',
    shortName: 'Coco',
    x: 185.01,
    y: 0,
    defaultImg: cocoGray,  // Ban đầu là ảnh xám
    hoverImg: cocoColor,   // Di chuột vào lên màu rực rỡ
    color: '#f97316'
  },
  {
    key: 'ina',
    name: "Ninomae Ina'nis",
    shortName: 'Ina',
    x: 282.01,
    y: 82,
    defaultImg: inaGray,
    hoverImg: inaColor,
    color: '#8b5cf6'
  },
  {
    key: 'korone',
    name: 'Inugami Korone',
    shortName: 'Korone',
    x: 92.01,
    y: 84,
    defaultImg: koroneGray,
    hoverImg: koroneColor,
    color: '#eab308'
  },
  {
    key: 'sora',
    name: 'Tokino Sora',
    shortName: 'Sora',
    x: 0,
    y: 166,
    defaultImg: soraGray,
    hoverImg: soraColor,
    color: '#3b82f6'
  },
  {
    key: 'suisei',
    name: 'Hoshimachi Suisei',
    shortName: 'Suisei',
    x: 185,
    y: 168,
    defaultImg: suiseiGray,
    hoverImg: suiseiColor,
    color: '#06b6d4'
  },
  {
    key: 'pekora',
    name: 'Usada Pekora',
    shortName: 'Pekora',
    x: 364.01,
    y: 185,
    defaultImg: pekoraGray,
    hoverImg: pekoraColor,
    color: '#67e8f9'
  },
  {
    key: 'ollie',
    name: 'Kureiji Ollie',
    shortName: 'Ollie',
    x: 92,
    y: 252,
    defaultImg: ollieGray,
    hoverImg: ollieColor,
    color: '#ef4444'
  },
  {
    key: 'biboo',
    name: 'Koseki Bijou',
    shortName: 'Biboo',
    x: 267,
    y: 267,
    defaultImg: bibooGray,
    hoverImg: bibooColor,
    color: '#c084fc'
  },
  {
    key: 'fubuki',
    name: 'Shirakami Fubuki',
    shortName: 'Fubuki',
    x: 0,
    y: 336,
    defaultImg: fubukiGray,
    hoverImg: fubukiColor,
    color: '#38bdf8'
  },
  {
    key: 'koyori',
    name: 'Hakui Koyori',
    shortName: 'Koyori',
    x: 174,
    y: 349,
    defaultImg: koyoriGray,
    hoverImg: koyoriColor,
    color: '#f472b6'
  },
  {
    key: 'aki',
    name: 'Aki Rosenthal',
    shortName: 'Aki',
    x: 364,
    y: 353,
    defaultImg: akiGray,
    hoverImg: akiColor,
    color: '#a3e635'
  },
  {
    key: 'ayame',
    name: 'Nakiri Ayame',
    shortName: 'Ayame',
    x: 267,
    y: 431,
    defaultImg: ayameGray,
    hoverImg: ayameColor,
    color: '#f43f5e'
  },
  {
    key: 'botan',
    name: 'Shishiro Botan',
    shortName: 'Botan',
    x: 92,
    y: 433,
    defaultImg: botanGray,
    hoverImg: botanColor,
    color: '#94a3b8'
  }
];

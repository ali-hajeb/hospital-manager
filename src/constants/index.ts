export const MAX_ROWS = 25;
export const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${process.env.NEXT_PUBLIC_PATH}` : '';
export const JALALI_WEEK_DAYS = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
];
export const JALALI_MONTHS = [
  "فروردین",  // Farvardin
  "اردیبهشت", // Ordibehesht
  "خرداد",    // Khordad
  "تیر",      // Tir
  "مرداد",    // Mordad
  "شهریور",   // Shahrivar
  "مهر",      // Mehr
  "آبان",     // Aban
  "آذر",      // Azar
  "دی",       // Dey
  "بهمن",     // Bahman
  "اسفند"     // Esfand
];

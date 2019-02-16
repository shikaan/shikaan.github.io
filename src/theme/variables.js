import { Size } from './size'

const BREAKPOINT = {
  XS: 480,
  SM: 768,
  MD: 980,
  LG: 1184,
  XL: 1366,
  MG: 1920
}

export const breakpoint = (size = 'SM') => `${BREAKPOINT[String(size).toUpperCase()]}${Size.BASE_UNIT}`

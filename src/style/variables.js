const BASE_SIZE = 8;
const BREAKPOINT = {
  XS: 480,
  SM: 768,
  MD: 980,
  LG: 1184,
  XL: 1366,
  MG: 1920
};

export const size = (multiplier = 1) => `${BASE_SIZE * multiplier}px`;

export const breakpoint = (size = "SM") =>
  `${BREAKPOINT[String(size).toUpperCase()]}px`;

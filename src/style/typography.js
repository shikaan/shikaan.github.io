import {color} from "./colors";
import {size} from "./variables";

export const primaryFont = {
  fontFamily: 'Merriweather, Georgia, serif ',
  color: color.black,
  hover: color.black
}

export const secondaryFont = {
  fontFamily: 'Lato, Geneva, Tahoma, sans-serif',
  color: color.black,
  hover: color.black
}

export const baseLineHeight = 1
export const baseFontSize = size(2)

export const paragraphs = {
  color: secondaryFont.color,
  fontFamily: secondaryFont.fontFamily,
  lineHeight: baseLineHeight,
  fontWeight: 400,
  letterSpacing: 0,
  fontSize: baseFontSize
}

export const links = {
  fontFamily: primaryFont.fontFamily,
  color: primaryFont.color,
  decoration: 'none',
  fontWeight: 600,
  letterSpacing: 0,
  textTransform: 'none'
}

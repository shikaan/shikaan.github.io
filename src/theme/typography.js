import { color } from './colors'
import Size from './size'

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

export const baseLineHeight = 'normal'
export const baseFontSize = new Size(2)

export const styles = {
  bodyTwo: {
    fontFamily: secondaryFont.fontFamily,
    fontWeight: 400,
    fontSize: baseFontSize.multiply(0.875)
  }
}

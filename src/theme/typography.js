import { color } from './colors'
import Size from './size'

export const primaryFont = {
  fontFamily: 'Merriweather, Georgia, serif',
  hover: color.black
}

export const secondaryFont = {
  fontFamily: 'Lato, Geneva, Tahoma, sans-serif',
  hover: color.black
}

export const baseLineHeight = 'normal'
export const baseFontSize = new Size(2)

const paragraphFontSize = baseFontSize
const h1FontSize = baseFontSize.multiply(2)
const h2FontSize = baseFontSize.multiply(1.75)
const h3FontSize = baseFontSize.multiply(1.5)

export const markdownGeneratedStyles = {
  bodyTwo: {
    fontFamily: secondaryFont.fontFamily,
    fontWeight: 400,
    fontSize: baseFontSize.multiply(0.875)
  },
  paragraph: {
    fontFamily: secondaryFont.fontFamily,
    lineHeight: paragraphFontSize.multiply(1.625),
    fontWeight: 400,
    letterSpacing: paragraphFontSize.multiply(0.01),
    fontSize: paragraphFontSize,
    padding: `${paragraphFontSize.multiply(0.75)} 0`,
    color: color.black
  },
  h1: {
    fontFamily: primaryFont.fontFamily,
    lineHeight: h1FontSize.multiply(1.5),
    fontWeight: 700,
    fontSize: h1FontSize,
    color: color.black
  },
  h2: {
    fontFamily: primaryFont.fontFamily,
    lineHeight: h2FontSize.multiply(1.5),
    fontWeight: 700,
    fontSize: h2FontSize,
    color: color.black
  },
  h3: {
    fontFamily: primaryFont.fontFamily,
    lineHeight: h3FontSize.multiply(1.5),
    fontSize: h3FontSize,
    fontWeight: 400,
    color: color.black
  }
}

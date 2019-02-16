import React from 'react'
import styled from 'styled-components'

import { baseLineHeight, baseFontSize, primaryFont, secondaryFont } from '~style/typography'

const H1 = styled.h1(() => {
  const fontSize = baseFontSize.multiply(1.5)
  const letterSpacing = 0
  const fontWeight = 900
  const lineHeight = baseLineHeight

  return {
    fontFamily: primaryFont.fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing
  }
})

const H2 = styled.h2(() => {
  const fontSize = baseFontSize
  const letterSpacing = baseFontSize.multiply(0.01)
  const fontWeight = 400
  const lineHeight = baseLineHeight

  return {
    fontFamily: secondaryFont.fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing
  }
})

const headingMap = {
  1: H1,
  2: H2
}

export default ({ level = 1, children }) => {
  return React.createElement(headingMap[level], { children })
}

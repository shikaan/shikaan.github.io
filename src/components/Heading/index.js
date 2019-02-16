import React from 'react'
import styled from 'styled-components'

import { size } from '~style/variables'
import { baseLineHeight, primaryFont, secondaryFont } from '~style/typography'

const H1 = styled.h1({
  fontFamily: primaryFont.fontFamily,
  lineHeight: baseLineHeight,
  fontWeight: 900,
  letterSpacing: 0,
  fontSize: size(3)
})

const H2 = styled.h2({
  fontFamily: secondaryFont.fontFamily,
  lineHeight: baseLineHeight,
  fontWeight: 400,
  letterSpacing: '0.15px',
  fontSize: size(2)
})

const headingMap = {
  1: H1,
  2: H2
}

export default ({ level = 1, children }) => {
  return React.createElement(headingMap[level], { children })
}

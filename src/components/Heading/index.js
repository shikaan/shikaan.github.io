import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1(({ theme }) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(1.5)};
  letter-spacing: 0;
  font-weight: 900;
  line-height: ${theme.typography.baseLineHeight};
  color: ${theme.color.black}
`)

const H2 = styled.h2(({ theme }) => `
  font-family: ${theme.typography.secondaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize}
  letter-spacing: ${theme.typography.baseFontSize.multiply(0.01)};
  font-weight: 400;
  line-height: ${theme.typography.baseLineHeight};
  color: ${theme.color.black}
`)

const headingMap = {
  1: H1,
  2: H2
}

export default (props) => {
  const level = props.level || 1

  return React.createElement(headingMap[level], props)
}

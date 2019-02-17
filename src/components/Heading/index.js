import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1(({ theme }) => {
  const fontSize = theme.typography.baseFontSize.multiply(1.5)
  const letterSpacing = 0
  const fontWeight = 900
  const lineHeight = theme.typography.baseLineHeight
  const color = theme.color.black

  return {
    fontFamily: theme.typography.primaryFont.fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing,
    color
  }
})

const H2 = styled.h2(({ theme }) => {
  const fontSize = theme.typography.baseFontSize
  const letterSpacing = theme.typography.baseFontSize.multiply(0.01)
  const fontWeight = 400
  const lineHeight = theme.typography.baseLineHeight
  const color = theme.color.black

  return {
    fontFamily: theme.typography.secondaryFont.fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing,
    color
  }
})

const headingMap = {
  1: H1,
  2: H2
}

export default (props) => {
  const level = props.level || 1

  return React.createElement(headingMap[level], props)
}

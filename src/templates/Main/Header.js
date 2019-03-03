import styled from 'styled-components'

import { Size } from '~theme'

import Link from '~components/Link'

export const headerHeight = new Size(7)
const padding = new Size(3)

export const Header = styled.header(({ theme }) => `
  width: 100%;
  height: ${headerHeight};
  background-color: ${theme.color.lightCoffee};
  position: fixed;
  box-shadow: 0 ${new Size(0.5)} ${new Size(0.5)} rgba(0, 0, 0, 0.24);
  z-index: ${theme.zIndexRank.top};
`)

export const Row = styled.div`
  display: flex;
`

export const Column = styled.div(({ theme }) => `
  & > * {
    line-height: ${headerHeight};
    vertical-align: "middle";
    font-size: ${theme.typography.baseFontSize.multiply(1.125)};
  }
`)

export const TitleColumn = styled(Column)(({ theme }) => `
  flex: 11;
  padding: 0 0 0 ${padding};
  
  ${Link} {
    font-size: ${new Size(2.5)}
    font-family: ${theme.typography.primaryFont.fontFamily};
    font-weight: 900;
    color: ${theme.color.darkGrey};
  }
`)

export const IconColumn = styled(Column)`
  flex: 1;
  text-align: right;
  padding: 0 ${padding} 0 0;
`

export const TitleChunk = styled.span(({ theme }) => `
  display: inline-block;
  margin: 0 ${new Size(0.25)};

  &::first-letter {
    color: ${theme.color.coffee};
  }
`)

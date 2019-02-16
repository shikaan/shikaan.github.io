import styled from 'styled-components'

import { Size } from '~theme'

import Link from '~components/Link'

export const headerHeight = new Size(7)

export const Header = styled.header`
  width: 100%;
  height: ${headerHeight};
  background: ${({ theme }) => theme.color.lightCoffee};
  position: fixed;
  box-shadow: 0 ${new Size(0.5)} ${new Size(0.5)} rgba(0, 0, 0, 0.24);
`

export const Row = styled.div`
  display: flex;
`

export const Column = styled.div`
  flex: 1;
  text-align: center;

  & > * {
    line-height: ${headerHeight};
    vertical-align: "middle";
    font-size: ${({ theme }) => theme.typography.baseFontSize.multiply(1.125)};
  }
`

export const MiddleColumn = styled(Column)`
  flex: 6;
  text-align: center;
  
  ${Link} {
    font-size: ${new Size(2.5)}
    font-weight: 900;
    color: ${({ theme }) => theme.color.darkGrey};
  }
`

export const TitleChunk = styled.span`
  display: inline-block;
  margin: 0 ${new Size(0.25)};

  &::first-letter {
    color: ${({ theme }) => theme.color.coffee};
  }
`

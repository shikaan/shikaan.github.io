import styled from 'styled-components'

import { headerHeight } from './Header'
import stain from '../../../static/stain.svg'

export const Main = styled.main`
  padding-top: ${headerHeight};
  background-color: ${({ theme }) => theme.color.lightCoffee};
  background-image: url(${stain});
  background-repeat: no-repeat;
  background-position: 5% 66%;
`

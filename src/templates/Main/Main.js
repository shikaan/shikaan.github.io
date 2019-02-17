import styled from 'styled-components'

import { headerHeight } from './Header'
import stain from '../../../static/stain.svg'

export const Main = styled.main`
  padding-top: ${headerHeight};
  background-image: url(${stain});
  background-repeat: no-repeat;
  background-position: 0 52vh;
  
  max-width: ${({ theme }) => theme.breakpoint.sm};
  margin: auto;
`

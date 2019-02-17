import styled from 'styled-components'
import { Size } from '~theme'

export default styled.hr`
  color: ${({ theme }) => theme.color.lightGrey};
  height: 1px;
  margin: 0 ${new Size(2)}
`

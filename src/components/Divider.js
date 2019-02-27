import styled from 'styled-components'
import { Size } from '~theme'

export default styled.hr(({ theme }) => `
  height: 1px;
  margin: 0 ${new Size(2)}
  color: ${theme.color.lightGrey};
`)

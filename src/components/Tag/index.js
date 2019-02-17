import styled from 'styled-components'

import Link from '~components/Link'

export default styled(Link)`
  font-family: ${({ theme }) => theme.typography.primaryFont.fontFamily};
  font-size: ${({ theme }) => theme.typography.baseFontSize.multiply(0.75)};
  font-weight: 700;
  text-decoration-line: underline;
  padding: 0 ${({ theme }) => theme.typography.baseFontSize.multiply(0.5)} 0 0;
  text-transform: capitalize;
  white-space: nowrap;
  display: inline-block;

  &:before {
    content: '#'
  }
`

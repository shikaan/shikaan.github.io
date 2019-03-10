import styled from 'styled-components'

import Link from '~components/Link'

const Tag = styled(Link)(({ theme }) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(0.75)};
  font-weight: 700;
  text-decoration-line: underline;
  padding: 0 ${theme.typography.baseFontSize.multiply(0.5)} 0 0;
  text-transform: capitalize;
  white-space: nowrap;
  display: inline-block;
  color: ${theme.color.black};

  &:before {
    content: '#'
  }
`)

export default Tag;

import styled from 'styled-components'

export default styled.span`
  font-family: ${({ theme }) => theme.typography.secondaryFont.fontFamily};
  font-size: ${({ theme }) => theme.typography.baseFontSize.multiply(0.75)}
  font-weight: 500;
  letter-spacing: ${({ theme }) => theme.typography.baseFontSize.multiply(0.0125)};
  padding-bottom: ${({ theme }) => theme.typography.baseFontSize.multiply(0.5)};
  display: block;
`

import styled from "styled-components";

const Overline = styled.span(({ theme }) => `
  display: block;
  font-weight: 500;
  font-family: ${theme.typography.secondaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(0.75)};
  padding-bottom: ${theme.typography.baseFontSize.multiply(0.5)};
  color: ${theme.color.dark600};
`);

export default Overline;

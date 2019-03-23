import styled from "styled-components";

import { Size } from "~theme";

const borderWidth = new Size(0.25);

const Input = styled.input(({ theme }) => `
  display: block;
  width: 100%;
  background: transparent;
  height: ${theme.typography.baseFontSize.multiply(2)};
  border: ${borderWidth} solid transparent;
  border-bottom: ${borderWidth} solid ${theme.color.mediumGrey};

  &::placeholder {
    font-size: ${theme.typography.baseFontSize};
    font-family: ${theme.typography.secondaryFont.fontFamily};
    color: ${theme.color.darkGrey}
  }
`);

export default Input;

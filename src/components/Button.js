import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getColorFromContext = (context, theme) => {
  switch (context) {
    case CONTEXT.ACCENT:
      return `
        border: 1px solid transparent;
        background-color: ${theme.color.brand400};
        color: ${theme.color.light}
      `;
    case CONTEXT.OUTLINE_LIGHT:
      return `
        border: 1px solid ${theme.color.light};
        background-color: transparent;
        color: ${theme.color.light};
      `;
    case CONTEXT.LIGHT:
      return `
        border: 1px solid transparent;
        background-color: ${theme.color.light};
        color: ${theme.color.brand400};
      `;
    default:
      return null;
  }
};

export const CONTEXT = {
  ACCENT: "accent",
  OUTLINE_LIGHT: "outline-light",
  LIGHT: "light",
};

const StyledButton = styled.button(({theme, context}) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(0.875)};
  font-weight: 700;
  padding: ${theme.typography.baseFontSize.multiply(0.5)} ${theme.typography.baseFontSize.multiply(1.5)};
  border-radius: 2px;

  ${getColorFromContext(context, theme)}  
`);

const Button = (props) => <StyledButton {...props} />;

Button.propTypes = {
  context: PropTypes.oneOf(Object.values(CONTEXT)),
  onClick: PropTypes.func
};

export default Button;

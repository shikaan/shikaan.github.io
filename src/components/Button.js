import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getColorFromContext = (context, theme) => {
  if (context === CONTEXT.ACCENT) {
    return `
      background-color: ${theme.color.brand400};
      color: ${theme.color.light}
    `;
  } else {
    return null;
  }
};

export const CONTEXT = {
  ACCENT: "accent"
};

const StyledButton = styled.button(({theme, context}) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(0.875)};
  font-weight: 700;
  border:none;
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

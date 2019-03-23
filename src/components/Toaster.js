import React from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import {Size} from "~theme";

const toasterMaxWidth = new Size(38);

const Wrapper = styled.div(({theme, visible}) => `
  position: fixed;
  bottom: 6vh;
  width: 100%;
  transition: all 400ms;
  ${handleVisibility(theme, visible)};
`);

const handleVisibility = (theme, visible) => {
  const visibleStyle = `
    opacity: 1;
    transform: translateY(0);
    z-index: ${theme.zIndexRank.top};
  `;

  const invisibleStyle = `
    opacity: 0;
    transform: translateY(16px);
    z-index: ${theme.zIndexRank.bottom};
  `;

  return visible ? visibleStyle : invisibleStyle;
};

const Toaster = React.memo(styled.div(({theme}) => `
  background: ${theme.color.darkGrey};
  color: ${theme.color.white};
  border-radius: 2px;
  text-align: center;
  font-family: ${theme.typography.secondaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize};
  font-weight: 700;
  letter-spacing: 0.15px;
  line-height: ${new Size(4)};
  max-width: ${toasterMaxWidth};
  margin: auto;
`));

const ToasterPortal = ({children, visible}) => {
  return createPortal(
    <Wrapper visible={visible}>
      <Toaster>{children}</Toaster>
    </Wrapper>,
    document.body
  );
};

ToasterPortal.propTypes = {
  visible: PropTypes.bool
};

export default ToasterPortal;

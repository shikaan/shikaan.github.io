import React from "react";
import styled from "styled-components";
import Button, {CONTEXT} from "~components/Button";

const BannerWrapper = styled.div(({theme}) => `
  width: 100%;
  padding: ${theme.typography.baseFontSize};
  background-color: ${theme.color.brand300};
  display: flex;
  justify-items: space-around;
`);

const BannerText = styled.span(({theme}) => `
  flex: 10;
  color: ${theme.color.light};
  line-height: ${theme.typography.baseFontSize.multiply(2.5)};
  vertical-align: middle;
`);

const BannerButtonWrapper = styled.div(() => `
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`);

export default ({children, visible, actionLabel, onAction, dismissLabel, onDismissed, ...rest}) => {
  return visible
    ? (
      <BannerWrapper {...rest} >
        <BannerText>
          {children}
        </BannerText>
        {
          actionLabel &&
          <BannerButtonWrapper>
            <Button context={CONTEXT.LIGHT} onClick={onAction}>
              {actionLabel}
            </Button>
          </BannerButtonWrapper>
        }
        {
          dismissLabel &&
          <BannerButtonWrapper>
            <Button context={CONTEXT.OUTLINE_LIGHT} onClick={onDismissed}>
              {dismissLabel}
            </Button>
          </BannerButtonWrapper>
        }
      </BannerWrapper>
    )
    : null;
};

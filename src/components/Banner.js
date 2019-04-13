import React from "react";
import styled from "styled-components";
import Button, {CONTEXT} from "~components/Button";

const BannerWrapper = styled.div(({theme}) => `
  width: 100%;
  padding: ${theme.typography.baseFontSize};
  background-color: ${theme.color.brand300};
  display: flex;
`);

const BannerText = styled.span(({theme}) => `
  flex: 11;
  color: ${theme.color.light};
  line-height: 40px;
  vertical-align: middle;
`);

const BannerButtonWrapper = styled.div(({theme}) => `
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`);

export default ({children, ctaLabel, ctaAction, ...rest}) => {
  return (
    <BannerWrapper {...rest} >
      <BannerText>
        {children}
      </BannerText>
      {
        ctaLabel &&
        <BannerButtonWrapper>
          <Button context={CONTEXT.OUTLINE_LIGHT} onClick={ctaAction}>
            {ctaLabel}
          </Button>
        </BannerButtonWrapper>
      }
    </BannerWrapper>
  );
};

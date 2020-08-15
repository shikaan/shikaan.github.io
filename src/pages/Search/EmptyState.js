import React, {Component} from "react";
import styled from "styled-components";

import EmptyStateSVG from "/static/assets/empty-state.svg";

import Heading, {CONTEXT} from "~components/Heading";
import Button from "~components/Button";

const EmptyStateHeading = styled(Heading)(({theme}) => `
  font-size: ${theme.typography.baseFontSize.multiply(2)};
  
  & + small {
    font-size: ${theme.typography.baseFontSize};
    padding: ${theme.templateVariables.verticalPadding} 0;
  }
`);

const EmptyStateWrapper = styled.div`
  text-align: center;
`;

const EmptyStateParagraph = styled.p(({theme}) => {
  const verticalPadding = theme.templateVariables.verticalPadding.multiply(1.5);
  const horizontalPadding = theme.templateVariables.horizontalPadding.multiply(1.5);

  return `
    padding: ${verticalPadding} ${horizontalPadding};
  `;
});

const EmptyStateImage = styled(EmptyStateSVG)`
  height: 35vh;
  width: 100%;
`;

const EmptyStateButton = styled(Button)`
  margin-bottom: 10vh;
`;

class EmptyState extends Component {
  render() {
    const {content, pickTrendingTopic} = this.props;

    return (
      <EmptyStateWrapper>
        <EmptyStateHeading level={3} context={CONTEXT.DISPLAY} sub={content.emptyState.paragraph[0]}>
          {content.emptyState.title}
        </EmptyStateHeading>
        <EmptyStateImage/>
        <EmptyStateParagraph>
          {content.emptyState.paragraph[1]}
        </EmptyStateParagraph>
        <EmptyStateButton context="accent" onClick={() => pickTrendingTopic()}>
          {content.emptyState.cta}
        </EmptyStateButton>
      </EmptyStateWrapper>
    );
  }
}

export default EmptyState;

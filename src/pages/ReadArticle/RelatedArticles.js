import React, {Component} from 'react';
import styled from "styled-components";

import Card from '~components/Card'
import Divider from "~components/Divider";
import Heading from "~components/Heading";

const Section = styled.section(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding}
`)

const UnorderedList = styled.ul(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} 0;
`)

class RelatedArticles extends Component {
  renderDivider = (index) => {
    const isLastElement = index === this.props.list.length - 1

    return isLastElement ? null : <Divider/>
  }

  render() {
    const {content, list} = this.props

    return (
      <Section>
        <Heading level={2}>
          {content.relatedArticles.title}
        </Heading>
        <UnorderedList>
          {
            list.map(({node}, index) => (
              <li>
                <Card key={index} post={node} content={content}/>
                {this.renderDivider(index)}
              </li>
            ))
          }
        </UnorderedList>
      </Section>
    );
  }
}

export default RelatedArticles;

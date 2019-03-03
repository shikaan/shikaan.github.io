import React, {Component} from 'react';
import styled from "styled-components";

import {Size} from '~theme'

import Card from '~components/Card'
import Divider from "~components/Divider";
import Heading from "~components/Heading";

const Section = styled.section(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding}
`)

const UnorderedList = styled.ul(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} 0;
`)

const ListItem = styled.li(() => `
  min-width: ${new Size(40)};
  max-width: 62%;
  margin: auto;
`)

const RelatedArticlesHeading = styled(Heading)(({theme}) => `
  padding: 0 ${theme.typography.baseFontSize.multiply(.5)}
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
        <RelatedArticlesHeading level={2}>
          {content.relatedArticles.title}
        </RelatedArticlesHeading>
        <UnorderedList>
          {
            list.map(({node}, index) => (
              <ListItem key={index}>
                <Card post={node} content={content}/>
                {this.renderDivider(index)}
              </ListItem>
            ))
          }
        </UnorderedList>
      </Section>
    );
  }
}

export default RelatedArticles;

import React, {Component, Fragment} from 'react';
import styled from "styled-components";

import Heading, {CONTEXT} from "~components/Heading";
import Tag from '~components/Tag';

const ListItem = styled.li`
  padding: 8px 16px;
`

class TrendingTopics extends Component {
  render() {
    const {content, trendingTopics} = this.props

    return (
      <Fragment>
        <Heading level={3} context={CONTEXT.DISPLAY}>
          {content.subTitle}
        </Heading>
        <ul>
          {
            trendingTopics.map((topic, index) => (
              <ListItem key={index}>
                <Tag to={`/search?query=${topic}`} replace>
                  {topic}
                </Tag>
              </ListItem>
            ))
          }
        </ul>
      </Fragment>)
  }
}

export default TrendingTopics;

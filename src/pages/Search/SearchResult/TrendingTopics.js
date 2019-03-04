import React, {Component, Fragment} from 'react';

import Heading from "~components/Heading";
import Tag from '~components/Tag';

class TrendingTopics extends Component {
  render() {
    const {content, trendingTopics} = this.props

    return (
      <Fragment>
        <Heading level={3}>
          {content.subTitle}
        </Heading>
        <ul>
          {
            trendingTopics.map((topic, index) => (
              <li key={index}>
                <Tag to={`/search?query=${topic}`} replace>
                  {topic}
                </Tag>
              </li>
            ))
          }
        </ul>
      </Fragment>)
  }
}

export default TrendingTopics;

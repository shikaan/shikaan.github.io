import React, {Component, Fragment} from "react";
import styled from "styled-components";

import Heading from "~components/Heading";
import Image from "~components/Image";
import Overline from "~components/Overline";
import Tag from "~components/Tag";

const Header = styled.header(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding};
`);

const FrontMatterHeading = styled(Heading)(({theme}) => `
  padding-bottom: ${theme.templateVariables.verticalPadding};
`);

class FrontMatter extends Component {
  render() {
    const {content, post, tags} = this.props;

    return (
      <Fragment>
        <Image fluid={post.coverImage.fluid} alt={post.title}/>
        <Header>
          <Overline>
            {post.createdAt} – {post.timeToRead} {content.shared.readingTime}
          </Overline>

          <FrontMatterHeading level={1} sub={post.description}>
            {post.title}
          </FrontMatterHeading>

          {tags.map(i => <Tag key={i} to={`/search?query=${i}`}>{i}</Tag>)}
        </Header>
      </Fragment>
    );
  }
}

export default FrontMatter;

import React, {Component, Fragment} from "react";
import styled from "styled-components";

import Heading from "~components/Heading";
import Image from "~components/Image";
import Overline from "~components/Overline";
import Tag from "~components/Tag";

import {Size} from "~theme";

const horizontalPadding = new Size(3)
const verticalPadding = new Size(2)

const Header = styled.header`
  padding: ${verticalPadding} ${horizontalPadding};
`

const FrontMatterHeading = styled(Heading)`
  padding-bottom: ${verticalPadding};
`

class FrontMatter extends Component {
  render() {
    const {post, pageContext} = this.props

    const readingTime = Math.ceil(post.fields.readingTime.minutes)

    return (
      <Fragment>
        <Image fluid={post.frontmatter.coverImage.childImageSharp.fluid} alt={post.frontmatter.title}/>
        <Header>
          <Overline>
            {post.frontmatter.date} – {readingTime} min read
          </Overline>

          <FrontMatterHeading level={1}>{post.frontmatter.title}</FrontMatterHeading>

          <FrontMatterHeading level={2}>{post.frontmatter.description}</FrontMatterHeading>

          {pageContext.tags.map(i => <Tag to={`/search?query=${i}`}>{i}</Tag>)}
        </Header>
      </Fragment>
    )
  }
}

export default FrontMatter;

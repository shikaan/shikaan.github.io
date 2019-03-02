import React, {Component, Fragment} from "react";
import styled from "styled-components";

import Heading from "~components/Heading";
import Image from "~components/Image";
import Overline from "~components/Overline";
import Tag from "~components/Tag";

import {Size} from "~theme"

const Header = styled.header(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding}
`)

const FrontMatterHeading = styled(Heading)(({theme}) => `
  padding-bottom: ${theme.templateVariables.verticalPadding};
`)

class FrontMatter extends Component {
  render() {
    const {content, post, tags} = this.props

    // TODO: move me to derived state from props
    const readingTime = Math.ceil(post.fields.readingTime.minutes)

    return (
      <Fragment>
        <Image fluid={post.frontmatter.coverImage.childImageSharp.fluid} alt={post.frontmatter.title}/>
        <Header>
          <Overline>
            {post.frontmatter.date} – {readingTime} {content.frontmatter.readingTime}
          </Overline>

          <FrontMatterHeading level={1} sub={post.frontmatter.description}>
            {post.frontmatter.title}
          </FrontMatterHeading>

          {tags.map(i => <Tag key={i} to={`/search?query=${i}`}>{i}</Tag>)}
        </Header>
      </Fragment>
    )
  }
}

export default FrontMatter;

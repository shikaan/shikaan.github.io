import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import {get} from 'lodash'

import Link from '~components/Link'
import Image from '~components/Image'
import Heading from '~components/Heading'
import Tag from '~components/Tag'
import Overline from "~components/Overline"

const Container = styled.div`
  padding: 16px 0;
`

const Body = styled(Link)(({theme}) => `
  display: grid;
  grid-gap: ${theme.typography.baseFontSize};
  grid-template-columns: 1fr 2fr;
`)

const Text = styled.div(() => `
  display: flex;
  flex-direction: column;
  overflow: hidden;
`)

const Tags = styled.div(({theme}) => `
  min-width: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`)

const CardHeading = styled(Heading)(() => `
  flex: 1
`)

const Card = ({post, content}) => {
  const readingTime = Math.ceil(post.fields.readingTime.minutes)
  const image = get(post, 'frontmatter.coverImage.childImageSharp.fixed')

  return (
    <Container>
      <Body to={post.fields.slug}>
      <Image fixed={image}/>
      <Text>
        <Overline>
          {post.frontmatter.date} – {readingTime} {content.frontmatter.readingTime}
        </Overline>

        <CardHeading level={3}>
          {post.frontmatter.title}
        </CardHeading>

        <Tags>
          {post.frontmatter.tags.slice(0, 2).map(i => <Tag key={i} to={`/search?query=${i}`}>{i}</Tag>)}
        </Tags>
      </Text>
      </Body>
    </Container>
  );
};

Card.propTypes = {
  post: PropTypes.shape({})
};

export default Card;

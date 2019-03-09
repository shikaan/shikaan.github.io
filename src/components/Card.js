import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {get} from 'lodash'

import Link from '~components/Link'
import Image from '~components/Image'
import Heading from '~components/Heading'
import Tag from '~components/Tag'
import Overline from '~components/Overline'

const Container = styled.div`
  padding: 16px 0;
`

const Body = styled.div(({theme}) => `
  display: grid;
  grid-gap: ${theme.typography.baseFontSize};
  grid-template-columns: 1fr 2fr;
`)

const ImageWrapper = styled(Link)(() => `
  text-align: center;
`)

const Text = styled.div(() => `
  display: flex;
  flex-direction: column;
  overflow: hidden;
`)

const Tags = styled.div(() => `
  min-width: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`)

const ClickableArea = styled(Link)(() => `
  flex: 1
`)

const Card = ({post, content, tagHistoryReplace = false}) => {
  const readingTime = Math.ceil(post.fields.readingTime.minutes)
  const image = get(post, 'frontmatter.coverImage.childImageSharp.fixed')

  return (
    <Container>
      <Body>
        <ImageWrapper to={post.fields.slug}>
          <Image fixed={image}/>
        </ImageWrapper>
        <Text>
          <ClickableArea to={post.fields.slug}>
            <Overline>
              {post.frontmatter.date} – {readingTime} {content.shared.readingTime}
            </Overline>

            <Heading level={3}>
              {post.frontmatter.title}
            </Heading>
          </ClickableArea>

          <Tags>
            {
              post.frontmatter.tags
                .slice(0, 2).map(i => (
                <Tag key={i} to={`/search?query=${i}`} replace={tagHistoryReplace}>
                  {i}
                </Tag>
              ))
            }
          </Tags>
        </Text>
      </Body>
    </Container>
  )
}

Card.propTypes = {
  post: PropTypes.shape({})
}

export default Card

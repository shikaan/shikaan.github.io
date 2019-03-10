import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Link from '~components/Link'
import Image from '~components/Image'
import Heading from '~components/Heading'
import Tag from '~components/Tag'
import Overline from '~components/Overline'

const Container = styled.div`
  padding: 16px 0;
`

const Body = styled.div(({theme, context}) => `
  display: grid;
  grid-gap: ${theme.typography.baseFontSize};
  grid-template-columns: ${
    context !== CONTEXT.FEATURED && `1fr 2fr`
  };
  grid-template-rows: ${
    context === CONTEXT.FEATURED && `1fr 1fr`
  };
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

export const CONTEXT = {
  FEATURED: 'featured'
}

export default class Card extends Component {
  renderCardHeading = () => {
    const {context, description, title} = this.props

    return context === CONTEXT.FEATURED
      ? <Heading level={1} sub={description} children={title}/>
      : <Heading level={3} children={title}/>
  }

  renderTags = () => {
    const {tags, replaceOnTagNavigate} = this.props

    return (
      <Tags>
        {
          tags.map(i => (
            <Tag key={i} to={`/search?query=${i}`} replace={replaceOnTagNavigate}>
              {i}
            </Tag>
          ))
        }
      </Tags>
    )
  }

  render() {
    const {slug, image, overline, context} = this.props;

    return (
      <Container>
        <Body context={context}>
          <ImageWrapper to={slug}>
            <Image {...image}/>
          </ImageWrapper>
          <Text>
            <ClickableArea to={slug}>
              <Overline>
                {overline}
              </Overline>

              {this.renderCardHeading()}
            </ClickableArea>

            {this.renderTags()}
          </Text>
        </Body>
      </Container>
    )
  }
}


Card.defaultProps = {tags: [], replaceOnTagNavigate: false}

Card.propTypes = {
  slug: PropTypes.string,
  image: PropTypes.shape({}),
  title: PropTypes.string,
  description: PropTypes.string,
  overline: PropTypes.string,
  replaceOnTagNavigate: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  context: PropTypes.oneOf(Object.values(CONTEXT))
}

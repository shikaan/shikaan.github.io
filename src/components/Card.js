import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {Size} from "~theme";

import Link from "~components/Link";
import Image from "~components/Image";
import Heading from "~components/Heading";
import Tag from "~components/Tag";
import Overline from "~components/Overline";
import GatsbyImage from "gatsby-image";

const padding = new Size(2);

const Container = styled.div(({context}) => `
  padding: ${padding} 0;
  ${context === CONTEXT.POLAROID ? "height: 100%" : undefined};
  ${context === CONTEXT.LIST ? `height: ${new Size(24)}` : undefined};
`);

const Body = styled.div(({theme, context}) => `
  height: 100%;
  display: grid;
  grid-gap: ${theme.typography.baseFontSize};
  ${context === CONTEXT.LIST ? "grid-template-columns: 1fr 2fr" : undefined};
  ${context === CONTEXT.POLAROID ? "grid-template-rows: 2fr .75fr" : undefined};
`);

const ImageLink = styled(Link)(() => `
  text-align: center;
`);

const ImageWrapper = styled(Image)(({context}) => `
  ${context === CONTEXT.POLAROID ? `height: ${new Size(35)}` : undefined };
  ${context === CONTEXT.LIST ? "height: 100%" : undefined };
`);

const Text = styled.div(() => `
  display: flex;
  flex-direction: column;
  overflow: hidden;
`);

const Tags = styled.div(() => `
  min-width: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);

const ClickableArea = styled(Link)(() => `
  flex: 1
`);

const CardHeading = styled(Heading)(() => `
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; 
  overflow: hidden;
`);

export const CONTEXT = {
  FEATURED: "featured",
  LIST: "list",
  POLAROID: "polaroid"
};

class Card extends PureComponent {
  renderCardHeading = () => {
    const {context, description, title} = this.props;

    return context === CONTEXT.FEATURED
      ? <CardHeading level={1} sub={description} children={title}/>
      : <CardHeading level={3} children={title}/>;
  }

  renderTags = () => {
    const {tags, replaceOnTagNavigate} = this.props;

    return (
      <Tags>
        {
          tags.map(i => (
            <Tag key={i} to={`/search?query=${i}`} replace={replaceOnTagNavigate ? true : undefined}>
              {i}
            </Tag>
          ))
        }
      </Tags>
    );
  }

  render() {
    const {slug, image, overline, context, title} = this.props;

    return (
      <Container context={context}>
        <Body context={context}>
        <ImageLink to={slug}>
          { image ? <ImageWrapper {...image} alt={title} context={context} /> : null }
        </ImageLink>
        <Text context={context}>
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
    );
  }
}


Card.defaultProps = {tags: [], replaceOnTagNavigate: false, context: CONTEXT.LIST};

Card.propTypes = {
  slug: PropTypes.string,
  image: PropTypes.shape(GatsbyImage.propTypes),
  title: PropTypes.string,
  description: PropTypes.string,
  overline: PropTypes.string,
  replaceOnTagNavigate: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string),
  context: PropTypes.oneOf(Object.values(CONTEXT))
};

export default Card;

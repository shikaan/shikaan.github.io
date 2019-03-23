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

const Container = styled.div`
  padding: ${padding} 0;
`;

const Body = styled.div(({theme, context}) => `
  display: grid;
  grid-gap: ${theme.typography.baseFontSize};
  grid-template-columns: ${context !== CONTEXT.FEATURED && "1fr 2fr"};
`);

const ImageWrapper = styled(Link)(() => `
  text-align: center;
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
  padding-bottom: ${padding};
`);

export const CONTEXT = {
  FEATURED: "featured"
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
      <Container>
        <Body context={context}>
        <ImageWrapper to={slug}>
          <Image {...image} alt={title}/>
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
    );
  }
}


Card.defaultProps = {tags: [], replaceOnTagNavigate: false};

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

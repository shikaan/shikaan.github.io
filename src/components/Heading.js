import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SubHeading = styled.small`
  display: block;
`;

const getContextStyle = ({ theme, context }) => {
  const defaultContextStyles = `
    font-family: ${theme.typography.primaryFont.fontFamily};
    font-weight: 900;
    line-height: ${theme.typography.baseLineHeight};
    letter-spacing: 0;
    color: ${theme.color.black};
  `;

  const displayContextStyles = `
    font-family: ${theme.typography.secondaryFont.fontFamily};
    font-weight: 400;
    line-height: ${theme.typography.baseLineHeight};
    letter-spacing: 0;
    color: ${theme.color.black};
    text-transform: uppercase;
  `;

  return context === CONTEXT.DISPLAY
    ? displayContextStyles
    : defaultContextStyles;
};

const H1 = styled.h1(({ theme, context }) => `
  ${getContextStyle({ theme, context })}
  font-size: ${theme.typography.baseFontSize.multiply(1.5)};
  
  & + small {
    font-family: ${theme.typography.secondaryFont.fontFamily};
    font-size: ${theme.typography.baseFontSize}
    letter-spacing: ${theme.typography.baseFontSize.multiply(0.01)};
    font-weight: 400;
    line-height: ${theme.typography.baseLineHeight};
    color: ${theme.color.black}  
  }
`);

const H2 = styled.h2(({ theme, context }) => `
  ${getContextStyle({ theme, context })}
  font-size: ${theme.typography.baseFontSize.multiply(1.25)};
  
  & + small {
    font-family: ${theme.typography.secondaryFont.fontFamily};
    font-size: ${theme.typography.baseFontSize.multiply(0.875)}
    letter-spacing: ${theme.typography.baseFontSize.multiply(0.00625)};
    font-weight: 400;
    line-height: ${theme.typography.baseLineHeight};
    color: ${theme.color.black}  
  }
`);

const H3 = styled.h3(({ theme, context }) => `
  ${getContextStyle({ theme, context })}
  font-size: ${theme.typography.baseFontSize.multiply(1.125)};
  
  & + small {
    font-family: ${theme.typography.secondaryFont.fontFamily};
    font-size: ${theme.typography.baseFontSize.multiply(0.875)}
    letter-spacing: ${theme.typography.baseFontSize.multiply(0.00625)};
    font-weight: 400;
    line-height: ${theme.typography.baseLineHeight};
    color: ${theme.color.black}  
  }
`);

const headingMap = {
  1: H1,
  2: H2,
  3: H3
};

export const CONTEXT = {
  DISPLAY: "display"
};

class Heading extends Component {
  render () {
    const {
      children,
      className,
      context,
      level = 1,
      sub
    } = this.props;

    const Heading = headingMap[level];

    return (
      <Fragment>
        <Heading className={className} context={context}>
          {children}
        </Heading>
        {sub && <SubHeading className={className}>{sub}</SubHeading>}
      </Fragment>
    );
  }
}

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3]),
  sub: PropTypes.string,
  context: PropTypes.oneOf(Object.values(CONTEXT))
};

export default Heading;

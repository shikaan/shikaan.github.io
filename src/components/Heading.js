import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const SubHeading = styled.small`
  display: block;
`

const H1 = styled.h1(({theme}) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(1.5)};
  letter-spacing: 0;
  font-weight: 900;
  line-height: ${theme.typography.baseLineHeight};
  color: ${theme.color.black};
  
  & > small {
    font-family: ${theme.typography.secondaryFont.fontFamily};
    font-size: ${theme.typography.baseFontSize}
    letter-spacing: ${theme.typography.baseFontSize.multiply(0.01)};
    font-weight: 400;
    line-height: ${theme.typography.baseLineHeight};
    color: ${theme.color.black}  
  }
`)

const H2 = styled.h2(({theme}) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(1.25)};
  letter-spacing: 0;
  font-weight: 900;
  line-height: ${theme.typography.baseLineHeight};
  color: ${theme.color.black};
  
  & > small {
    font-family: ${theme.typography.secondaryFont.fontFamily};
    font-size: ${theme.typography.baseFontSize.multiply(0.875)}
    letter-spacing: ${theme.typography.baseFontSize.multiply(0.00625)};
    font-weight: 400;
    line-height: ${theme.typography.baseLineHeight};
    color: ${theme.color.black}  
  }
`)

const headingMap = {
  1: H1,
  2: H2,
}


class Heading extends Component {
  render() {
    const {
      children,
      className,
      level = 1,
      sub
    } = this.props

    const Heading = headingMap[level]

    return (
      <Fragment>
        <Heading className={className}>
          {children}
        </Heading>
        {sub && <SubHeading className={className}>{sub}</SubHeading>}
      </Fragment>
    )
  }
}

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2]),
  sub: PropTypes.string
};

export default Heading;

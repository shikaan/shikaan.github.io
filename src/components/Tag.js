import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {camelCase} from 'lodash'

import Link from '~components/Link'

const StyledLink = styled(Link)(({theme}) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-size: ${theme.typography.baseFontSize.multiply(0.75)};
  font-weight: 700;
  text-decoration-line: underline;
  padding: 0 ${theme.typography.baseFontSize.multiply(0.5)} 0 0;
  text-transform: capitalize;
  white-space: nowrap;
  display: inline-block;
  color: ${theme.color.black};

  &:before {
    content: '#'
  }
`)

const Tag = ({children, ...rest}) => {
  return <StyledLink children={camelCase(children)} {...rest} />
}

Tag.propTypes = {
  children: PropTypes.string
}

export default Tag;

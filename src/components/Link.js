import React from 'react'
import {Link as GatsbyLink, navigate as gastbyNavigate} from 'gatsby'
import styled from 'styled-components'

const UnstyledButton = styled.button`
  background:none !important;
  border:none; 
  padding:0!important;
  cursor: pointer;
  text-align: unset;
  
  &:focus {outline:0;}
`

const UnstyledLink = ({href, onClick, ...rest}) => {
  if (href) {
    return React.createElement('a', {href, ...rest})
  } else if (onClick) {
    return React.createElement(UnstyledButton, {onClick, ...rest})
  }

  return React.createElement(GatsbyLink, rest)
}

export const navigate = gastbyNavigate

const Link = styled(UnstyledLink)(({theme}) => `
  font-family: ${theme.typography.primaryFont.fontFamily};
  font-weight: 700;
  text-decoration: none;
`)

export default Link

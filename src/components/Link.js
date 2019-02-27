import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

const UnstyledButton = styled.button`
  background:none !important;
  border:none; 
  padding:0!important;
  cursor: pointer;
  
  &:focus {outline:0;}
`

const Link = ({ href, onClick, children, ...rest }) => {
  if (href) {
    return React.createElement('a', { children, href, ...rest })
  } else if (onClick) {
    return React.createElement(UnstyledButton, { children, onClick, ...rest })
  }

  return React.createElement(GatsbyLink, { children, ...rest })
}

export default styled(Link)`
  text-decoration: none;
`

import React from 'react'
import styled from 'styled-components'

const IconWrapper = styled.i`
  font-style: normal;
`

const Icon = ({icon, className, children}) => {
  const iconClassName = `cdd-${icon || String(children)}`
  const classes = className
    ? `${className} ${iconClassName}`
    : iconClassName

  return <IconWrapper className={classes}/>
}

export default Icon

import React from 'react'
import Img from 'gatsby-image'

export default ({ src, alt, ...rest }) => {
  return src
    ? <img src={src} alt={alt} {...rest} />
    : <Img {...rest} />
}

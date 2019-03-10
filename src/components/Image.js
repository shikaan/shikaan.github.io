import React from 'react'
import Img from 'gatsby-image'

const Image = ({ src, alt, ...rest }) => {
  return src
    ? <img src={src} alt={alt} {...rest} />
    : <Img {...rest} />
}

export default Image

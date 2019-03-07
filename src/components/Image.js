import React from 'react';
import Img from 'gatsby-image'

export default ({src, ...rest}) => {
  return src
    ? <img src={src} {...rest} />
    : <Img {...rest} />
}

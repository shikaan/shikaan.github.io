import React from "react";
import Img from "gatsby-image";

const Image = ({src, ...rest}) => {
  return src
    ? <img src={src} {...rest} />
    : <Img {...rest} />;
};

export default Image;

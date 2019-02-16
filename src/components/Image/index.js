import React, {Component} from "react";

class Image extends Component {
  render() {
    const {alt, className, src, srcSet} = this.props;

    return (
      <picture className={className}>
        {srcSet && <source srcSet={srcSet}/>}
        <img alt={alt} src={src} srcSet={srcSet}/>
      </picture>
    );
  }
}

export default Image;

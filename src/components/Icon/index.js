import React from "react";
import styled from "styled-components";

const IconWrapper = styled.i`
  font-style: normal;
`

export default class Icon extends React.Component {
  render() {
    const {icon, className, children} = this.props;

    const iconClassName = `cdd-${icon || String(children)}`
    const classes = className
      ? `${className} ${iconClassName}`
      : iconClassName

    return <IconWrapper className={classes}/>;
  }
}

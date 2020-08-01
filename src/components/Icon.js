import React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";

const IconWrapper = styled.i`
  font-style: normal;
`;

const getClassName = (className, icon) => className ? `${className} fswb-${icon}` : `fswb-${icon}`;

class Icon extends React.Component {
  render() {
    const {icon, className, children} = this.props;

    return <IconWrapper className={getClassName(className, icon ?? children)}/>;
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string
};

export default Icon;

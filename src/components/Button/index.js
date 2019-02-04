import React from "react";

export default class Button extends React.Component {
  render() {
    const {children, onClick} = this.props

    return <button onClick={onClick}>{children}</button>
  }
}

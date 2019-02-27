import React, {Component} from 'react';
import styled from "styled-components";

import {Size} from '~theme'

const borderWidth = new Size(.25)

const StyledInput = styled.input(({theme}) => `
  display: block;
  width: 100%;
  background: transparent;
  height: ${theme.typography.baseFontSize.multiply(2)};
  border: ${borderWidth} solid transparent;
  border-bottom: ${borderWidth} solid ${theme.color.mediumGrey};

  &::placeholder {
    font-size: ${theme.typography.baseFontSize};
    font-family: ${theme.typography.secondaryFont.fontFamily};
    color: ${theme.color.darkGrey}
  }
`)

const Wrapper = styled.div`
  padding: 16px;
`

class Input extends Component {
  render() {
    return (
      <Wrapper>
        <StyledInput {...this.props} />
      </Wrapper>
    )
  }
}

export default Input;

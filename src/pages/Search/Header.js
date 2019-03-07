import React, {Component} from 'react';
import styled from "styled-components";

import {Size} from '~theme'

import Link from "~components/Button";
import Icon from "~components/Icon";

const headerHeight = new Size(7)

const StyledHeader = styled.header`
  height: ${headerHeight};
  text-align: right;
`

const CloseButton = styled(Link)(({theme}) => `
  color: ${theme.color.darkGrey};
  font-size: ${theme.typography.baseFontSize.multiply(1.125)};
  line-height: ${headerHeight};
  padding: 0 ${theme.templateVariables.horizontalPadding} 0 0;
  cursor: pointer;
  background: unset;
  
  &:hover {
    background: unset;
  }
`)

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <CloseButton onClick={() => window.history.back()}>
          <Icon>
            close
          </Icon>
        </CloseButton>
      </StyledHeader>
    );
  }
}

export default Header;

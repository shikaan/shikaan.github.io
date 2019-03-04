import React, {Component} from 'react';
import styled from "styled-components";

import Link from "~components/Button";
import Icon from "~components/Icon";

const StyledHeader = styled.header`
  text-align: right;
`

const CloseButton = styled(Link)(({theme}) => `
  color: ${theme.color.darkGrey};
  font-size: 18px;
  line-height: 56px;
  padding: 0 16px 0 0;
  cursor: pointer;
  
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

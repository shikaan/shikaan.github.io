import React from 'react';
import styled from "styled-components";

import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon} from "react-share";

import Divider from '~components/Divider'
import Icon from '~components/Icon'

const Overlay = styled.div(({theme, visible}) => `
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  display: ${visible ? 'flex' : 'none'};
  height: 100%;
  width: 100%;
  background-color: ${theme.color.grey};
  z-index: ${theme.zIndexRank.top};
  cursor: pointer;
`)

const Menu = styled.nav(({theme}) => `
  align-self: flex-end;
  background: ${theme.color.paleGrey};
  display: flex;
  flex-direction: column;
  width: 100vw;
`)

const MenuTitle = styled.span(({theme}) => `
  flex: 1;
  font-size: ${theme.typography.baseFontSize.multiply(1)};
  color: ${theme.color.black};
  padding: ${theme.typography.baseFontSize};
`)

const MenuItems = styled.ul`
  flex: 1
`

const MenuItem = styled.li(({theme}) => `
  list-style:none
  padding: ${theme.typography.baseFontSize};
  
  & > * {
    display: flex;
  }
`)

const MenuItemLabel = styled.span(({theme, size}) => `
  line-height: ${size}px;
  padding: 0 ${theme.typography.baseFontSize};
  flex: 1;
`)

const CloseShareButton = styled.div``

const CloseShareIcon = styled(Icon)(({size}) => `
  line-height: ${size}px;
  text-align: center;
  width: ${size}px;
`)

const FallbackShare = (props) => {
  const {onClose, visible} = props

  return (
    <Overlay onClick={onClose} visible={visible}>
      <Menu>
        <MenuTitle>Share</MenuTitle>
        <Divider/>
        <MenuItems>
          <MenuItem>
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon round size={32}/>
              <MenuItemLabel size={32}>Facebook</MenuItemLabel>
            </FacebookShareButton>
          </MenuItem>
          <MenuItem>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon round size={32}/>
              <MenuItemLabel size={32}>Twitter</MenuItemLabel>
            </TwitterShareButton>
          </MenuItem>
        </MenuItems>
        <Divider/>
        <MenuItem>
          <CloseShareButton>
            <CloseShareIcon size={32}>
              close
            </CloseShareIcon>
            <MenuItemLabel size={32}>Close</MenuItemLabel>
          </CloseShareButton>
        </MenuItem>
      </Menu>
    </Overlay>
  );
}

export default FallbackShare;

import styled from "styled-components";

import {Size} from "~/theme";

import {headerHeight} from "./Header";

const scrollOffset = new Size(1);

export const Main = styled.main(({theme}) => `
  padding-top: ${headerHeight};
  max-width: ${theme.breakpoint.sm};
  margin: auto;
  
  h1:target[id]:before,
  h2:target[id]:before,
  h3:target[id]:before {
    content:"";
    display: block;
    height: ${headerHeight.add(scrollOffset)};
    margin: ${headerHeight.add(scrollOffset).multiply(-1)} 0 0;
  }
`);

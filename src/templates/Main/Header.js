import styled from "styled-components";

import LogoSVG from "/static/assets/logo.svg";

import {Size} from "~theme";

import Banner from "~components/Banner";

export const headerHeight = new Size(8);
const padding = new Size(2);

export const Header = styled.header(({theme}) => `
  width: 100%;
  height: ${headerHeight};
  background-color: ${theme.color.light};
  position: fixed;
  box-shadow: 0 ${new Size(0.5)} ${new Size(0.5)} rgba(0, 0, 0, 0.24);
  z-index: ${theme.zIndexRank.top};
`);

export const Row = styled.div`
  display: flex;
`;

export const Column = styled.div(({theme}) => `
  line-height: ${headerHeight};
  vertical-align: middle;
  font-size: ${theme.typography.baseFontSize.multiply(1.125)};
`);

export const TitleColumn = styled(Column)`
  flex: 11;
`;

export const IconColumn = styled(Column)`
  flex: 1;
  text-align: right;
  padding: 0 ${padding} 0 0;
`;

export const Logo = styled(LogoSVG)`
  height: ${new Size(8)};
  width: ${new Size(25)};
  padding: ${new Size(.5)} ${new Size(2)};
`;

export const Disclaimer = styled(Banner)`
  top: ${headerHeight};
  position: fixed;
  z-index: 100;
 `;

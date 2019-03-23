import styled from "styled-components";

import stain from "/static/stain.svg";
import { headerHeight } from "./Header";

export const Main = styled.main(({ theme }) => `
  padding-top: ${headerHeight};
  background-color: ${theme.color.lightCoffee};
  background-image: url(${stain});
  background-repeat: no-repeat;
  background-position: 0 52vh;
  
  max-width: ${theme.breakpoint.sm};
  margin: auto;
`);

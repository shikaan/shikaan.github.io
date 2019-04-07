import styled from "styled-components";

import { headerHeight } from "./Header";

export const Main = styled.main(({ theme }) => `
  padding-top: ${headerHeight};
  max-width: ${theme.breakpoint.sm};
  margin: auto;
`);

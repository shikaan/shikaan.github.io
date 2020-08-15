import styled from "styled-components";
import {Size} from "~/theme";

export const UnorderedCardList = styled.ul(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding};
  display: grid;
  grid-gap: ${new Size(2)};
  

  @media (min-width: ${theme.breakpoint.xs}) {
    grid-template-columns: 1fr;
  }
  
  @media (min-width: ${theme.breakpoint.md}) {
    grid-template-columns: 1fr 1fr;
  }
`);

export const CardListItem = styled.li(({theme}) => `
  margin: auto;
  height: 100%;
  width: 100%;
  
  @media (min-width: ${theme.breakpoint.xs}) {
    min-width: ${new Size(32)};
  }
`);
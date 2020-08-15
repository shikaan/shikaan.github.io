import React, {Component, Fragment} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {ThemeProvider} from "styled-components";

import theme, {GlobalStyle, Size} from "~theme";

const GlobalBackground = createGlobalStyle`
  background: ${theme.color.dark100};
`;

const Main = styled.main(({theme}) => `
  max-width: ${theme.breakpoint.sm};
  margin: auto;
  min-height: 100vh;
`);

const templateVariables = {
  horizontalPadding: new Size(2),
  verticalPadding: new Size(2)
};

class SearchTemplate extends Component {
  render() {
    return (
      <ThemeProvider theme={{...theme, templateVariables}}>
        <Fragment>
          <GlobalStyle/>
          <GlobalBackground/>
          <Main>
            {this.props.children}
          </Main>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default SearchTemplate;

import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import {ThemeProvider} from "styled-components";

import theme, {GlobalStyle, Size} from "~theme";

const Main = styled.main(({theme}) => `
  background: ${theme.color.lightGrey};
  max-width: ${theme.breakpoint.sm};
  margin: auto;
  height: 100vh;
`)

const templateVariables = {
  horizontalPadding: new Size(3),
  verticalPadding: new Size(2)
}

class SearchTemplate extends Component {
  render() {
    return (
      <ThemeProvider theme={{...theme, templateVariables}}>
        <Fragment>
          <GlobalStyle/>
          <Main>
            {this.props.children}
          </Main>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default SearchTemplate;

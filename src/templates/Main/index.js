import React, {Fragment} from "react";
import styled, {ThemeProvider} from "styled-components";

import theme, {GlobalStyle, Size} from "~theme";

import Icon from "~components/Icon";
import Link from "~components/Link";

import {IconColumn, Header, TitleColumn, Row, TitleChunk} from "./Header";
import {Main} from './Main'

const templateVariables = {
  horizontalPadding: new Size(3),
  verticalPadding: new Size(2)
}

class MainTemplate extends React.Component {
  render() {
    return (
      <ThemeProvider theme={{...theme, templateVariables}}>
        <Fragment>
          <GlobalStyle/>
          <Header>
            <Row>
              <TitleColumn>
                <Link to={`/`}>
                  <TitleChunk>coffee</TitleChunk>
                  <TitleChunk>driven</TitleChunk>
                  <TitleChunk>development</TitleChunk>
                </Link>
              </TitleColumn>
              <IconColumn>
                <Link to={`/search`}>
                  <Icon>search</Icon>
                </Link>
              </IconColumn>
            </Row>
          </Header>
          <Main>
            {this.props.children}
          </Main>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default MainTemplate;

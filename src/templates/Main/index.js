import React, {Fragment} from "react";
import styled, {ThemeProvider} from "styled-components";

import theme, {GlobalStyle, Size} from "~theme";

import Icon from "~components/Icon";
import Link from "~components/Link";

import {IconColumn, Header, TitleColumn, Row, TitleChunk} from "./Header";
import {Main as MainSection} from './Main'

const templateVariables = {
  horizontalPadding: new Size(3),
  verticalPadding: new Size(2)
}

class Main extends React.Component {
  render() {
    const {location, title, children} = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

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
          <MainSection>
            {children}
          </MainSection>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default Main;

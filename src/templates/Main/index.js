import React, {Fragment} from "react";
import {ThemeProvider} from "styled-components";
import isMobile from "is-mobile";

import theme, {GlobalStyle, Size} from "~theme";

import Icon from "~components/Icon";
import Link from "~components/Link";

import {en as content} from "/static/content/_shared";
import {repository} from "../../../package";

import {IconColumn, Header, MainBanner, TitleColumn, Row, Logo} from "./Header";
import {Main} from "./Main";

const templateVariables = {
  horizontalPadding: new Size(3),
  verticalPadding: new Size(2)
};

class MainTemplate extends React.Component {
  static BANNER_STATUS = {
    OPEN: "open",
    CLOSED: "closed",
    DISMISSED: "dimsissed"
  }

  state = {
    bannerStatus: MainTemplate.BANNER_STATUS.CLOSED
  }

  contributeCta = () => {
    const global = typeof window !== "undefined" ? window : {location: {}};
    global.location.href = repository.url;
  }

  componentDidMount() {
    if (!isMobile() && this.state.bannerStatus !== MainTemplate.BANNER_STATUS.DISMISSED) {
      this.setState({bannerStatus: MainTemplate.BANNER_STATUS.OPEN});
    }
  }

  render() {
    const {bannerStatus} = this.state;

    return (
      <ThemeProvider theme={{...theme, templateVariables}}>
        <Fragment>
          <GlobalStyle/>
          <Header>
            <Row>
              <TitleColumn>
                <Link to={"/home"}>
                  <Logo/>
                </Link>
              </TitleColumn>
              <IconColumn>
                <Link to={"/search"}>
                  <Icon>search</Icon>
                </Link>
              </IconColumn>
            </Row>
          </Header>
          {
            bannerStatus === MainTemplate.BANNER_STATUS.OPEN &&
            <MainBanner ctaLabel={content.disclaimer.ctaLabel} ctaAction={() => this.contributeCta()}>
              {content.disclaimer.text}
            </MainBanner>
          }
          <Main>
            {this.props.children}
          </Main>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default MainTemplate;

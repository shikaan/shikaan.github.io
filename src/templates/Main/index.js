import React, {Fragment} from "react";
import {ThemeProvider} from "styled-components";
import isMobile from "is-mobile";

import theme, {GlobalStyle, Size} from "~theme";
import {getGlobalWithKey} from "~/utils";

import Icon from "~components/Icon";
import Link from "~components/Link";

import {en as content} from "/static/content/_shared";
import {repository} from "../../../package";

import {IconColumn, Header, Disclaimer, TitleColumn, Row, Logo} from "./Header";
import {Main} from "./Main";

const templateVariables = {
  horizontalPadding: new Size(3),
  verticalPadding: new Size(2)
};

class MainTemplate extends React.Component {
  static DISCLAIMER_BANNER_STATUS = {
    OPEN: "open",
    CLOSED: "closed",
    DISMISSED: "dimsissed"
  }

  static DISCLAIMER_BANNER_STATUS_KEY = "disclaimerBannerStatus";

  state = {
    [MainTemplate.DISCLAIMER_BANNER_STATUS_KEY]: MainTemplate.DISCLAIMER_BANNER_STATUS.CLOSED
  }

  openContributeLink = () => {
    const global = getGlobalWithKey("location");
    global.location.href = repository.url;
  }

  dismissBanner = () => {
    this.setState({
      disclaimerBannerStatus: MainTemplate.DISCLAIMER_BANNER_STATUS.DISMISSED
    }, () => {
      const global = getGlobalWithKey("sessionStorage");

      global.sessionStorage.setItem(MainTemplate.DISCLAIMER_BANNER_STATUS_KEY, MainTemplate.DISCLAIMER_BANNER_STATUS.DISMISSED);
    });
  }

  componentDidMount() {
    const global = getGlobalWithKey("sessionStorage");

    const isDisclaimerBannerStoredAsDismissed = global.sessionStorage.getItem(MainTemplate.DISCLAIMER_BANNER_STATUS_KEY) === MainTemplate.DISCLAIMER_BANNER_STATUS.DISMISSED;

    if (isDisclaimerBannerStoredAsDismissed) {
      this.setState({disclaimerBannerStatus: MainTemplate.DISCLAIMER_BANNER_STATUS.DISMISSED});
    } else if (!isMobile()) {
      this.setState({disclaimerBannerStatus: MainTemplate.DISCLAIMER_BANNER_STATUS.OPEN});
    }
  }

  render() {
    const disclaimerBannerStatus = this.state[MainTemplate.DISCLAIMER_BANNER_STATUS_KEY];

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

          <Disclaimer
            visible={disclaimerBannerStatus === MainTemplate.DISCLAIMER_BANNER_STATUS.OPEN}
            dismissLabel={content.disclaimer.dismissLabel}
            onDismissed={() => this.dismissBanner()}
            actionLabel={content.disclaimer.actionLabel}
            onAction={() => this.openContributeLink()}>
            {content.disclaimer.text}
          </Disclaimer>

          <Main>
            {this.props.children}
          </Main>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default MainTemplate;

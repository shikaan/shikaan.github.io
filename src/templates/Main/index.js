import React, {Fragment} from "react";
import {ThemeProvider} from "styled-components";

import theme, {GlobalStyle, Size} from "~theme";
import {getGlobalWithKey, getMicrocopy, isMobile} from "~/utils";

import Icon from "~components/Icon";
import Link from "~components/Link";

import {repository} from "../../../package";

import {IconColumn, Header, Disclaimer, TitleColumn, Row, Logo} from "./Header";
import {Footer} from "./Footer";
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
    [MainTemplate.DISCLAIMER_BANNER_STATUS_KEY]: MainTemplate.DISCLAIMER_BANNER_STATUS.CLOSED,
    content: this.props.content // Should this maybe be a static query?
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
    const { content } = this.state;

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
            content && <Disclaimer
              visible={disclaimerBannerStatus === MainTemplate.DISCLAIMER_BANNER_STATUS.OPEN}
              dismissLabel={getMicrocopy(content?.microcopy, "shared.disclaimer-dismiss")}
              onDismissed={() => this.dismissBanner()}
              actionLabel={getMicrocopy(content?.microcopy, "shared.disclaimer-action")}
              onAction={() => this.openContributeLink()}>
              {getMicrocopy(content?.microcopy, "shared.disclaimer-message")}
            </Disclaimer>
          }

          <Main>
            {this.props.children}
          </Main>
          <Footer>
            {this.props.footer}
          </Footer>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default MainTemplate;

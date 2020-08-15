import React, {Component} from "react";
import styled from "styled-components";

import {REPO_BASE_URL} from "~/constants";
import {getGlobalWithKey, getMicrocopy} from "~/utils";

import Icon from "~components/Icon";
import Link from "~components/Link";

import FallbackShare from "./FallbackShare";

const Section = styled.section(({theme}) => `
  padding: 0 ${theme.templateVariables.horizontalPadding.multiply(2)};
  padding-bottom: ${theme.templateVariables.verticalPadding.multiply(2)};
  display: flex;
  justify-content: space-around;
`);

const CTALink = styled(Link)(({theme}) => `
  color: ${theme.color.dark600};
  font-size: ${theme.typography.baseFontSize.multiply(1.75)};
`);

class CallToActions extends Component {
  state = {
    isFallbackShareVisible: false
  };

  static buildEditUrl(relativeFilePath) {
    return `${REPO_BASE_URL}/edit/master/${relativeFilePath}`;
  }

  static useFallbackShare() {
    const global = getGlobalWithKey("navigator");
    return !global.navigator.share;
  }

  share = () => {
    const {post} = this.props;

    if (CallToActions.useFallbackShare()) {
      this.openFallbackShare();
    } else {
      navigator.share({
        url: window.location.href,
        title: document.title,
        text: post.title
      });
    }
  };

  openFallbackShare = () => {
    this.setState({isFallbackShareVisible: true});
  };

  closeFallbackShare = () => {
    this.setState({isFallbackShareVisible: false});
  };

  renderFallbackShare = (shareVisible) => {
    return CallToActions.useFallbackShare()
      ? <FallbackShare onClose={this.closeFallbackShare} visible={shareVisible}/>
      : null;
  };

  render() {
    const {content, post} = this.props;

    return (
      <Section>
        <CTALink alt={getMicrocopy(content.microcopy,"read-article.comment")} href={post.commentLink}>
          <Icon>comment</Icon>
        </CTALink>

        <CTALink alt={getMicrocopy(content.microcopy,"read-article.share")} onClick={this.share}>
          <Icon>share</Icon>
        </CTALink>

        {this.renderFallbackShare(this.state.isFallbackShareVisible)}
      </Section>
    );
  }
}

export default CallToActions;

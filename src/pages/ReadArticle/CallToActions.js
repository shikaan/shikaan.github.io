import React, { Component } from 'react'
import styled from 'styled-components'

import { REPO_BASE_URL } from '~/constants'

import Icon from '~components/Icon'
import Link from '~components/Link'

import FallbackShare from './FallbackShare'

const Section = styled.section(({ theme }) => `
  padding: 0 ${theme.templateVariables.horizontalPadding.multiply(2)};
  padding-bottom: ${theme.templateVariables.verticalPadding.multiply(2)};
  display: flex;
  justify-content: space-between;
`)

const CTALink = styled(Link)(({ theme }) => `
  color: ${theme.color.coffee};
  font-size: ${theme.typography.baseFontSize.multiply(1.75)}
`)

class CallToActions extends Component {
  state = {
    isFallbackShareVisible: false
  };

  static buildEditUrl (relativeFilePath) {
    return `${REPO_BASE_URL}/edit/master/${relativeFilePath}`
  }

  static useFallbackShare () {
    return !navigator.share
  }

  share = () => {
    const { post } = this.props

    if (CallToActions.useFallbackShare()) {
      this.openFallbackShare()
    } else {
      navigator.share({
        url: window.location.href,
        title: document.title,
        text: post.frontmatter.title
      })
    }
  };

  openFallbackShare = () => {
    this.setState({ isFallbackShareVisible: true })
  };

  closeFallbackShare = () => {
    this.setState({ isFallbackShareVisible: false })
  };

  renderFallbackShare = (shareVisible) => {
    return CallToActions.useFallbackShare()
      ? <FallbackShare onClose={this.closeFallbackShare} visible={shareVisible}/>
      : null
  };

  render () {
    const { content, post } = this.props

    return (
      <Section>
        <CTALink alt={content.callToActions.comment} href={post.frontmatter.commentLink}>
          <Icon>comment</Icon>
        </CTALink>

        <CTALink alt={content.callToActions.edit} href={CallToActions.buildEditUrl(post.fields.relativeFilePath)}>
          <Icon>edit</Icon>
        </CTALink>

        <CTALink alt={content.callToActions.share} onClick={this.share}>
          <Icon>share</Icon>
        </CTALink>

        {this.renderFallbackShare(this.state.isFallbackShareVisible)}
      </Section>
    )
  }
}

export default CallToActions

import React, {Component} from 'react';
import styled from "styled-components";

import {NEWSLETTER_WEBHOOK_ADDRESS} from "~/constants";

import Button from '~components/Button'
import Heading from '~components/Heading'
import Form from '~components/Form'
import Input from '~components/Input'

const Section = styled.section(({theme}) => `
  text-align: center;
  padding: ${theme.templateVariables.horizontalPadding}
`)

const NewsletterHeading = styled(Heading)(({theme}) => `
  padding-bottom: ${theme.templateVariables.verticalPadding};
`)

class Newsletter extends Component {
  inputRef = React.createRef()

  state = {
    email: ''
  }

  saveEmailAddress = async (address) => {
    fetch(NEWSLETTER_WEBHOOK_ADDRESS, {method: 'POST', body: JSON.stringify({email: address})})
  }

  handleEmailChange = ({target}) => {
    this.setState({email: target.value})
  }

  handleSubscribe = (e) => {
    e.preventDefault()

    const isEmailValid = this.inputRef.current.reportValidity()

    if (isEmailValid) {
      this.saveEmailAddress(this.state.email)
    }
  }

  render() {
    const {content} = this.props

    return (
      <Section>
        <NewsletterHeading level={2} sub={content.newsletter.subTitle}>
          {content.newsletter.title}
        </NewsletterHeading>
        <form onSubmit={this.handleSubscribe}>
          <Input
            inputRef={this.inputRef}
            type="email"
            placeholder={content.newsletter.inputPlaceholder}
            value={this.state.email}
            onChange={this.handleEmailChange}/>

          <Button context="coffee" type="submit">
            {content.newsletter.ctaLabel}
          </Button>
        </form>
      </Section>
    );
  }
}

export default Newsletter;

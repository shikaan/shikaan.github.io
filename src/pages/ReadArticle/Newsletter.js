import React, { Component } from "react";
import styled from "styled-components";

import { Size } from "~theme";
import { NEWSLETTER_WEBHOOK_ADDRESS } from "~/constants";

import Button from "~components/Button";
import Heading from "~components/Heading";
import Form from "~components/Form";
import Input from "~components/Input";
import Toaster from "~components/Toaster";
import {getMicrocopy} from "~/utils";

const Section = styled.section(({ theme }) => `
  text-align: center;
  padding: ${theme.templateVariables.horizontalPadding};
`);

const NewsletterHeading = styled(Heading)(({ theme }) => `
  padding-bottom: ${theme.templateVariables.verticalPadding};
`);

const NewsletterForm = styled(Form)(() => `
  min-width: ${new Size(40)};
  max-width: 62%;
  margin: auto;
`);

const InputWrapper = styled.div(({ theme }) => `
  padding: ${theme.templateVariables.horizontalPadding};
`);

class Newsletter extends Component {
  static TOASTER_DURATION = 3000;
  static INITIAL_STATE = {
    email: "",
    showSuccessToaster: false,
    showErrorToaster: false
  };

  inputRef = React.createRef();

  state = { ...Newsletter.INITIAL_STATE };

  saveEmailAddress = (address) => {
    return fetch(NEWSLETTER_WEBHOOK_ADDRESS, { method: "POST", body: JSON.stringify({ email: address }) });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handleSubscribe = async (e) => {
    e.preventDefault();

    const isEmailValid = this.inputRef.current.reportValidity();

    if (isEmailValid) {
      try {
        await this.saveEmailAddress(this.state.email);
        this.handleSubscribeSuccess();
      } catch (e) {
        this.handleSubscribeError();
      }
    }
  };

  handleSubscribeSuccess = () => {
    this.setState({ showSuccessToaster: true }, () => {
      setTimeout(() => {
        this.setState(Newsletter.INITIAL_STATE);
      }, Newsletter.TOASTER_DURATION);
    });
  };

  handleSubscribeError = () => {
    this.setState({ showErrorToaster: true }, (state) => {
      setTimeout(() => {
        const email = state.email;
        this.setState({ ...Newsletter.INITIAL_STATE, email });
      }, Newsletter.TOASTER_DURATION);
    });
  };

  render () {
    const { content } = this.props;
    const { email, showSuccessToaster, showErrorToaster } = this.state;

    return (
      <Section>
        <Toaster visible={showSuccessToaster}>
          {getMicrocopy(content.microcopy, "read-article.newsletter-success")}
        </Toaster>
        <Toaster visible={showErrorToaster}>
          {getMicrocopy(content.microcopy, "read-article.newsletter-fail")}
        </Toaster>
        <NewsletterHeading level={2} sub={content.subtitle}>
          {content.title}
        </NewsletterHeading>
        <NewsletterForm onSubmit={this.handleSubscribe}>
          <InputWrapper>
            <Input
              ref={this.inputRef}
              type="email"
              required
              placeholder={getMicrocopy(content.microcopy, "read-article.newsletter-placeholder")}
              value={email}
              onChange={this.handleEmailChange}/>
          </InputWrapper>

          <Button context="accent" type="submit">
            {getMicrocopy(content.microcopy, "read-article.newsletter-cta")}
          </Button>
        </NewsletterForm>
      </Section>
    );
  }
}

export default Newsletter;

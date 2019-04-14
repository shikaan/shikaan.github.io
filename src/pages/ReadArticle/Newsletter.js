import React, { Component } from "react";
import styled from "styled-components";

import { Size } from "~theme";
import { NEWSLETTER_WEBHOOK_ADDRESS } from "~/constants";

import Button from "~components/Button";
import Heading from "~components/Heading";
import Form from "~components/Form";
import Input from "~components/Input";
import Toaster from "~components/Toaster";

const Section = styled.section(({ theme }) => `
  text-align: center;
  padding: ${theme.templateVariables.horizontalPadding}
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
          {content.newsletter.successMessage}
        </Toaster>
        <Toaster visible={showErrorToaster}>
          {content.newsletter.failMessage}
        </Toaster>
        <NewsletterHeading level={2} sub={content.newsletter.subTitle}>
          {content.newsletter.title}
        </NewsletterHeading>
        <NewsletterForm onSubmit={this.handleSubscribe}>
          <InputWrapper>
            <Input
              ref={this.inputRef}
              type="email"
              required
              placeholder={content.newsletter.inputPlaceholder}
              value={email}
              onChange={this.handleEmailChange}/>
          </InputWrapper>

          <Button context="accent" type="submit">
            {content.newsletter.actionLabel}
          </Button>
        </NewsletterForm>
      </Section>
    );
  }
}

export default Newsletter;

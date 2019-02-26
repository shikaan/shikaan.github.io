import React, {Component} from 'react';
import styled from "styled-components";

import {NEWSLETTER_WEBHOOK_ADDRESS} from "~/constants";
import Button from '~components/Button'

const Section = styled.section`

`

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
    return (
      <Section>
        <form onSubmit={this.handleSubscribe}>
          <input ref={this.inputRef} type="email" value={this.state.email} onChange={this.handleEmailChange}/>
          <Button type="submit">Subscribe</Button>
        </form>
      </Section>
    );
  }
}

export default Newsletter;

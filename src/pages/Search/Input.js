import React, { Component } from 'react'
import styled from 'styled-components'

import Input from '~components/Input'

const Section = styled.section(({ theme }) => `
  padding: ${theme.templateVariables.horizontalPadding};
`)

const StyledInput = styled(Input)(({ theme }) => `
  font-size: ${theme.typography.baseFontSize.multiply(2.5)};
  height: ${theme.typography.baseFontSize.multiply(3)};
  border: none;
  
  &::placeholder {
    font-size: ${theme.typography.baseFontSize.multiply(2.5)};
    color: ${theme.color.mediumGrey};
  }
`)

const InputWrapper = styled.div(({ theme }) => `
  padding: ${theme.templateVariables.horizontalPadding} 0;
`)

class SearchResults extends Component {
  handleInputChange = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase()

    this.props.setSearchQuery(searchQuery, this.props.performSearch)
  };

  render () {
    const { content, searchQuery } = this.props

    return (
      <Section>
        <InputWrapper>
          <StyledInput
            value={searchQuery}
            placeholder={content.placeholder}
            onChange={this.handleInputChange}/>
        </InputWrapper>
      </Section>
    )
  }
}

export default SearchResults

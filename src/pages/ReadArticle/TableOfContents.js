import React, { Component } from "react";
import styled from "styled-components";

const bodyTwoStyle = (theme) => (`
  font-family: ${theme.typography.secondaryFont.fontFamily},
  font-weight: 400,
  font-size: ${theme.typography.baseFontSize}
`);

const Content = styled.nav`
  font-family: ${({ theme }) => theme.typography.secondaryFont.fontFamily};
  padding: 0 ${({ theme }) => theme.templateVariables.horizontalPadding};
`;

const ContentHeader = styled.header`
  ${({ theme }) => bodyTwoStyle(theme)}
  font-weight: 700;
  padding: ${({ theme }) => theme.templateVariables.verticalPadding} 0;
`;

const ContentSection = styled.section(({theme}) =>`
  padding-bottom: ${theme.templateVariables.verticalPadding.multiply(2)};
  
  & > ul {
    padding: 0 ${theme.typography.baseFontSize.multiply(0.5)};
    list-style-position: inside;
     
    p {
        display: inline;
    }
    
    ul {
      color: ${theme.color.dark500};
    }
    
    a {
      ${bodyTwoStyle(theme)};
      text-decoration: none;
      padding: ${theme.templateVariables.verticalPadding} 0;
      display: inline-block;
      width: calc(100% - ${theme.templateVariables.horizontalPadding});
    }
    
    li {      
      font-size: ${theme.typography.baseFontSize};
      list-style-type: disc;
      list-style-position: inside;
      
      li {
        list-style-type: circle;
        padding-left: ${theme.typography.baseFontSize};
      }
     }
  }
`);

class TableOfContents extends Component {
  render () {
    const { content, post } = this.props;

    return (
      <Content>
        <ContentHeader>
          {content.tableOfContents.title}
        </ContentHeader>
        <ContentSection dangerouslySetInnerHTML={{ __html: post.tableOfContents }}/>
      </Content>
    );
  }
}

export default TableOfContents;

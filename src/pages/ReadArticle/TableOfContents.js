import React, {Component} from 'react';
import styled from "styled-components";

const Content = styled.nav`
  font-family: ${({theme}) => theme.typography.secondaryFont.fontFamily};
  padding: 0 ${({theme}) => theme.templateVariables.horizontalPadding};
`

const ContentHeader = styled.header`
  ${({theme}) => theme.typography.markdownGeneratedStyles.bodyTwo}
  font-weight: 700;
  padding: ${({theme}) => theme.templateVariables.verticalPadding} 0;
`

const ContentSection = styled.section`
  & > ul {
    padding: 0 ${({theme}) => theme.typography.baseFontSize.multiply(0.5)};
     
    p {
        display: inline;
    }
    
    ul {
      color: ${({theme}) => theme.color.darkGrey}
    }
    
    a {
      ${({theme}) => theme.typography.markdownGeneratedStyles.bodyTwo}
      text-decoration: none;
    }
    
    li {
      font-size: ${({theme}) => theme.typography.baseFontSize.multiply(0.75)};
      list-style-type: disc;
      list-style-position: inside;
      
      li {
        padding: ${({theme}) => theme.templateVariables.verticalPadding} 0;
        list-style-type: circle;
        padding-left: ${({theme}) => theme.typography.baseFontSize} 
      }
     }
  }
`

class TableOfContents extends Component {
  render() {
    const {post} = this.props

    return (
      <Content>
        <ContentHeader>
          Content
        </ContentHeader>
        <ContentSection dangerouslySetInnerHTML={{__html: post.tableOfContents}}/>
      </Content>
    )
  }
}

export default TableOfContents;

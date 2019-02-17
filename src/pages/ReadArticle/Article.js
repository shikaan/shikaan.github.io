import React, {Component} from 'react';
import styled from "styled-components";
import "prismjs/themes/prism-dark.css"

const paragraphFontSize = (theme) => theme.typography.baseFontSize.multiply(1.125)
const h1FontSize = (theme) => theme.typography.baseFontSize.multiply(2)
const h2FontSize = (theme) => theme.typography.baseFontSize.multiply(1.75)
const h3FontSize = (theme) => theme.typography.baseFontSize.multiply(1.5)

const ArticleBody = styled.article`
  padding: ${({theme}) => theme.templateVariables.horizontalPadding}
  
  p {
    font-family: ${({theme}) => theme.typography.secondaryFont.fontFamily};
    line-height: ${({theme}) => paragraphFontSize(theme).multiply(1.625)};
    font-weight: 400;
    letter-spacing: ${({theme}) => paragraphFontSize(theme).multiply(0.01)};
    font-size: ${({theme}) => paragraphFontSize(theme)};
    padding: ${({theme}) => paragraphFontSize(theme).multiply(0.75)} 0;
    color: ${({theme}) => theme.color.black}
  }
  
  h1 {
    font-family: ${({theme}) => theme.typography.primaryFont.fontFamily};
    line-height: ${({theme}) => h1FontSize(theme).multiply(1.5)};
    font-weight: 700;
    font-size: ${({theme}) => h1FontSize(theme)};
    color: ${({theme}) => theme.color.black}
  }
  
  h2 {
    font-family: ${({theme}) => theme.typography.primaryFont.fontFamily};
    line-height: ${({theme}) => h2FontSize(theme).multiply(1.5)};
    font-weight: 700;
    font-size: ${({theme}) => h2FontSize(theme)};
    color: ${({theme}) => theme.color.black} 
  }
  
  h3, h4, h5 {
    font-family: ${({theme}) => theme.typography.primaryFont.fontFamily};
    line-height: ${({theme}) => h3FontSize(theme).multiply(1.5)};
    font-size: ${({theme}) => h3FontSize(theme)};
    font-weight: 400;
    color: ${({theme}) => theme.color.black} 
  }
`

class Article extends Component {
  render() {
    const {post} = this.props

    return (
      <ArticleBody dangerouslySetInnerHTML={{__html: post.html}}/>
    );
  }
}

export default Article;

import React, {Component} from "react";
import styled from "styled-components";
import "prismjs/themes/prism-dark.css";

const paragraphFontSize = (theme) => theme.typography.baseFontSize.multiply(1.125);
const h1FontSize = (theme) => theme.typography.baseFontSize.multiply(2);
const h2FontSize = (theme) => theme.typography.baseFontSize.multiply(1.75);
const h3FontSize = (theme) => theme.typography.baseFontSize.multiply(1.5);

const ArticleBody = styled.article(({theme}) => `
  padding: ${theme.templateVariables.horizontalPadding}
  
  p {
    font-family: ${theme.typography.secondaryFont.fontFamily};
    line-height: ${paragraphFontSize(theme).multiply(1.625)};
    font-weight: 400;
    letter-spacing: ${paragraphFontSize(theme).multiply(0.01)};
    font-size: ${paragraphFontSize(theme)};
    padding: ${paragraphFontSize(theme).multiply(0.75)} 0;
    color: ${theme.color.dark600};
    
    code {
      white-space: nowrap;
    }
  }
  
  h1 {
    font-family: ${theme.typography.primaryFont.fontFamily};
    line-height: ${h1FontSize(theme).multiply(1.5)};
    font-weight: 700;
    font-size: ${h1FontSize(theme)};
    color: ${theme.color.dark600};
  }
  
  h2 {
    font-family: ${theme.typography.primaryFont.fontFamily};
    line-height: ${h2FontSize(theme).multiply(1.5)};
    font-weight: 700;
    font-size: ${h2FontSize(theme)};
    color: ${theme.color.dark600} 
  }
  
  h3, h4, h5 {
    font-family: ${theme.typography.primaryFont.fontFamily};
    line-height: ${h3FontSize(theme).multiply(1.5)};
    font-size: ${h3FontSize(theme)};
    font-weight: 400;
    color: ${theme.color.dark600} 
  }
  
  sup {
    vertical-align: text-bottom;
    font-size: ${paragraphFontSize(theme).multiply(.75)};
    padding: ${paragraphFontSize(theme).multiply(.25)};
  }
  
  em {
    font-style: italic;
  }
  
  strong {
    font-weight: 700;
  }
  
  img {
    margin: auto;
  }
  
  ul {
    list-style-type: disc;
    list-style-position: inside;
    padding: ${paragraphFontSize(theme)};
    
    ul {
      list-style-type: circle;
      list-style-position: inside;
      padding: 0 ${paragraphFontSize(theme)};
    }
    
    li {
      padding: ${paragraphFontSize(theme).multiply(.25)} 0;
      > p {
        display: inline;
      }
    }
  }
  
  blockquote {
    border-left: 4px solid ${theme.color.brand400};
    padding: 0 ${theme.typography.baseFontSize};
    margin: ${theme.typography.baseFontSize} 0;
    background: ${theme.color.brand100};
  }
  
  .footnotes {
    ol {
      list-style-type: decimal;
      list-style-position: inside;
      
      li {
        padding: ${paragraphFontSize(theme).multiply(.5)} 0;
        
        p { 
          font-size: ${paragraphFontSize(theme)};
          display: inline;
        }
      }
    }
  }
`);

class Article extends Component {
  render() {
    const {post} = this.props;

    return (
      <ArticleBody dangerouslySetInnerHTML={{__html: post.html}}/>
    );
  }
}

export default Article;

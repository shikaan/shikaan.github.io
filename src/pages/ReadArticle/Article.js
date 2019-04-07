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
    color: ${theme.color.dark600}
  }
  
  h1 {
    font-family: ${theme.typography.primaryFont.fontFamily};
    line-height: ${h1FontSize(theme).multiply(1.5)};
    font-weight: 700;
    font-size: ${h1FontSize(theme)};
    color: ${theme.color.dark600}
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

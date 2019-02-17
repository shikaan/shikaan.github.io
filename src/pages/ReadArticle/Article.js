import React, {Component} from 'react';
import styled from "styled-components";
import "prismjs/themes/prism-dark.css"


const ArticleBody = styled.article`
  padding: ${({theme}) => theme.templateVariables.horizontalPadding}
  
  p {
    ${({theme}) => theme.typography.markdownGeneratedStyles.paragraph}
  }
  
  h1 {
    ${({theme}) => theme.typography.markdownGeneratedStyles.h1}  
  }
  
  h2 {
    ${({theme}) => theme.typography.markdownGeneratedStyles.h2}  
  }
  
  h3, h4, h5 {
    ${({theme}) => theme.typography.markdownGeneratedStyles.h3}  
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

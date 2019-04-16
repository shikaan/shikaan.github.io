import React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {get} from "lodash";

import {en as readArticleContent} from "/static/content/ReadArticle";
import {en as sharedContent} from "/static/content/_shared";

import Template from "~templates/Main";

import Divider from "~components/Divider";
import SEO from "~components/SEO";

import CallToActions from "./CallToActions";
import FrontMatter from "./FrontMatter";
import TableOfContents from "./TableOfContents";
import Article from "./Article";
import Newsletter from "./Newsletter";
import RelatedArticles from "./RelatedArticles";

const content = {
  ...readArticleContent,
  shared: sharedContent
};

const ReadArticleDivider = styled(Divider)(({theme}) => `
  margin: 0 ${theme.templateVariables.horizontalPadding};
`);

class ReadArticlePage extends React.Component {
  render() {
    const {
      data = {},
      pageContext = {},
      location = {}
    } = this.props;

    const {article} = data;

    const relatedArticles = get(data, "relatedArticles.edges", []); // FIXME: when we flatten queries
    const siteTitle = get(data, "site.siteMetadata.title", "");
    const {tags} = pageContext;

    const articleTitle = get(article, "frontmatter.title", "");
    const articleDescription = get(article, "frontmatter.description", "");
    const articleImage = get(article, "frontmatter.coverImage.childImageSharp.fluid.originalImg", "");

    return (
      <Template location={this.props.location} title={siteTitle}>
        <SEO
          image={`${this.props.location.origin}${articleImage}`}
          type={"article"}
          lang={"en"}
          title={articleTitle}
          description={articleDescription} // TODO: maybe an excerpt is better for SEO?
          keywords={tags}
          slug={location.pathname}
        />

        <FrontMatter post={article} tags={tags} content={content}/>
        <ReadArticleDivider/>
        <TableOfContents post={article} content={content}/>
        <ReadArticleDivider/>
        <Article post={article}/>
        <CallToActions post={article} content={content}/>
        <ReadArticleDivider/>
        <Newsletter content={content}/>
        <ReadArticleDivider/>
        <RelatedArticles list={relatedArticles} content={content}/>
      </Template>
    );
  }
}

export default ReadArticlePage;

export const pageQuery = graphql`
  query BlogPostBySlug($path: String!, $tags: [String!]) {
    site {
      siteMetadata {
        title
        author
      }
    }
    article: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      tableOfContents(
        maxDepth: 2
      )
      fields {
        slug
        relativeFilePath
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        commentLink
        coverImage {
          childImageSharp {
            fluid {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
              originalImg
              originalName
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
    relatedArticles: allMarkdownRemark(
      limit: 3, 
      sort: {
        fields: [frontmatter___date], order: DESC
      }, 
      filter: {
        fields: {
          slug: {ne: $path}
        }
        frontmatter: {
          tags: {in: $tags}
        }
      }) {
      edges {
        node {
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
            coverImage {
              childImageSharp {
                fixed(width:112, height:112) {
                  width
                  height
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`;

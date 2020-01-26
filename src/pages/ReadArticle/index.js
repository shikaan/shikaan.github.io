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
    const fallbackRelatedArticles = get(data, "fallbackRelatedArticles.edges", []); // FIXME: when we flatten queries
    const siteUrl = get(data, "site.siteMetadata.siteUrl", "");
    const {tags} = pageContext;

    const articleTitle = get(article, "frontmatter.title", "");
    const articleDescription = get(article, "frontmatter.description", "");
    const articleImage = get(article, "frontmatter.coverImage.childImageSharp.fluid.originalImg", "");

    return (
      <Template>
        <SEO
          image={`${siteUrl}${articleImage}`}
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
        <RelatedArticles list={relatedArticles} fallbackList={fallbackRelatedArticles} content={content}/>
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
                siteUrl
            }
        }
        article: contentfulArticle(slug: {eq: $path }) {
            slug
            title
            description
            updatedAt
            commentLink
            coverImage {
                fluid {
                    ...GatsbyContentfulFluid
                }
            }
            body {
                childMarkdownRemark {
                    html
                    timeToRead
                }
            }
        },
        relatedArticles: allContentfulArticle (
            limit: 3,
            sort: {
                fields: [createdAt], order: DESC
            },
            filter: {
                slug: {ne: $path}
                tags: {in: $tags}
            }
        ) {
            edges {
                node {
                    slug,
                    title,
                    updatedAt,
                    tags,
                    body {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                    coverImage {
                        fixed(width: 112, height: 112) {
                            ...GatsbyContentfulFixed
                        }
                    }
                }
            }
        },
        fallbackRelatedArticles: allContentfulArticle (
            limit: 3,
            sort: {
                fields: [createdAt], order: DESC
            },
            filter: {
                slug: {ne: $path}
            }
        ) {
            edges {
                node {
                    slug,
                    title,
                    updatedAt,
                    tags,
                    body {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                    coverImage {
                        fixed(width: 112, height: 112) {
                            ...GatsbyContentfulFixed
                        }
                    }
                }
            }
        }
    }
`;

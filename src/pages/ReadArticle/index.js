import React from "react";
import {graphql} from "gatsby";
import styled from "styled-components";
import {get} from "lodash";

import Template from "~templates/Main";

import Divider from "~components/Divider";
import SEO from "~components/SEO";

import {getSection} from "~/utils";

import CallToActions from "./CallToActions";
import FrontMatter from "./FrontMatter";
import TableOfContents from "./TableOfContents";
import Article from "./Article";
import Newsletter from "./Newsletter";
import RelatedArticles from "./RelatedArticles";

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

    const {article, content} = data;

    const relatedArticles = get(data, "relatedArticles.edges", []); // FIXME: when we flatten queries
    const fallbackRelatedArticles = get(data, "fallbackRelatedArticles.edges", []); // FIXME: when we flatten queries
    const siteUrl = get(data, "site.siteMetadata.siteUrl", "");
    const {tags} = pageContext;

    const articleImageUrl = get(article, "coverImage.fluid.originalImg", "");

    const footer = (
      <RelatedArticles
        list={relatedArticles}
        fallbackList={fallbackRelatedArticles}
        content={getSection(content.sections, "read-article.related-articles")}
      />
    );

    return (
      <Template footer={footer} content={getSection(content.sections, "shared.disclaimer")}>
        <SEO
          image={`${siteUrl}${articleImageUrl}`}
          type={"article"}
          lang={"en"}
          title={article.title}
          description={article.description} // TODO: maybe an excerpt is better for SEO?
          keywords={tags}
          slug={location.pathname}
        />

        <FrontMatter article={article} tags={tags} content={getSection(content.sections, "read-article.frontmatter")}/>
        <ReadArticleDivider/>
        <TableOfContents article={article} content={getSection(content.sections, "read-article.content")}/>
        <ReadArticleDivider/>
        <Article article={article}/>
        <CallToActions article={article} content={getSection(content.sections, "read-article.call-to-actions")}/>
        <ReadArticleDivider/>
        <Newsletter content={getSection(content.sections, "read-article.newsletter")}/>
      </Template>
    );
  }
}

export default ReadArticlePage;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!, $tags: [String!]) {
        site {
            siteMetadata {
                title
                author
                siteUrl
            }
        }
        content: contentfulPage(reference: { eq: "read-article" }) {
          sections {
            microcopy {
              reference
              value
            }
            reference
            title
            subtitle
          }
        }
        article: contentfulArticle(slug: { eq: $slug }) {
            slug
            title
            description
            publishDate(formatString: "MMMM, DD YYYY")
            commentLink
            coverImage {
                fluid {
                    ...GatsbyContentfulFluid
                }
            }
            timeToRead
            body {
                childMarkdownRemark {
                    html
                    tableOfContents
                }
            }
        },
        relatedArticles: allContentfulArticle (
            limit: 4,
            sort: {
                fields: [publishDate], order: DESC
            },
            filter: {
                slug: {ne: $slug}
                tags: {in: $tags}
            }
        ) {
            edges {
                node {
                    slug,
                    title,
                    publishDate(formatString: "MMMM, DD YYYY"),
                    tags,
                    body {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                    coverImage {
                        fluid {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        },
        fallbackRelatedArticles: allContentfulArticle (
            limit: 4,
            sort: {
                fields: [publishDate], order: DESC
            },
            filter: {
                slug: {ne: $slug}
            }
        ) {
            edges {
                node {
                    slug,
                    title,
                    publishDate(formatString: "MMMM, DD YYYY"),
                    tags,
                    body {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                    coverImage {
                        fluid {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
`;

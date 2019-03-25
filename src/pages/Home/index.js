import React, {Component} from "react";
import {get} from "lodash";
import {graphql} from "gatsby";

import {en as shared} from "/static/content/_shared";

import Template from "~templates/Main";
import SEO from "~components/SEO";

import FeaturedArticle from "./FeaturedArticle";
import OtherArticles from "./OtherArticles";

const content = {shared};

class HomePage extends Component {
  render() {
    const {data = {}} = this.props;
    const {featuredArticle, site} = data;

    const _otherArticles = get(data, "otherArticles.edges", []);
    const otherArticles = _otherArticles.map(i => i.node); // FIXME: when we flatten queries

    const title = get(site, "siteMetadata.title");
    const description = get(site, "siteMetadata.description");

    return (
      <Template>
        <SEO lang={"en"} title={title} description={description}/>

        <FeaturedArticle featuredArticle={featuredArticle} content={content}/>
        <OtherArticles otherArticles={otherArticles} content={content}/>
      </Template>
    );
  }
}

export default HomePage;

export const pageQuery = graphql`
  query ($featuredArticleId: String!) {
    site {
      siteMetadata {
        title,
        description
      }
    }
    featuredArticle: markdownRemark(id: {eq: $featuredArticleId}) {
      fields {
        slug
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
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
    otherArticles: allMarkdownRemark(
      limit: 5, 
      sort: {
        fields: [frontmatter___date], order: DESC
      },
      filter: {
        id: {ne: $featuredArticleId}
      }
    ) {
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

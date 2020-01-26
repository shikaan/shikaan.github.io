import React, {Component} from "react";
import {get} from "lodash";
import {graphql} from "gatsby";

import {en as sharedContent} from "/static/content/_shared";
import {en as homeContent} from "/static/content/Home";

import Template from "~templates/Main";
import SEO from "~components/SEO";

import FeaturedArticle from "./FeaturedArticle";
import OtherArticles from "./OtherArticles";

const content = {
  ...homeContent,
  shared: sharedContent
};

class HomePage extends Component {
  render() {
    const {data = {}} = this.props;
    const {featuredArticle, site} = data;

    const _otherArticles = get(data, "otherArticles.edges", []);
    const otherArticles = _otherArticles.map(i => i.node); // FIXME: when we flatten queries

    const description = get(site, "siteMetadata.description");

    return (
      <Template>
        <SEO lang={"en"}
             title={content.title}
             description={description}
             keywords={content.keywords}
             slug={"/home"}/>

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
    featuredArticle: contentfulArticle(id: {eq: $featuredArticleId}) {
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
                timeToRead
            }
        }
    }
    otherArticles: allContentfulArticle (
      limit: 3,
      sort: {
        fields: [createdAt], order: DESC
      },
      filter: {
        id: {ne: $featuredArticleId}
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

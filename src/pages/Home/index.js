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
        createdAt(formatString: "MMMM DD, YYYY")
        commentLink
        tags
        coverImage {
            fluid {
                ...GatsbyContentfulFluid
            }
        }
        timeToRead
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
                slug
                title
                createdAt(formatString: "MMMM DD, YYYY")
                tags
                timeToRead
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

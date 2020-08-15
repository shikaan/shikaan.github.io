import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title, slug, image, type }) {
  return (
    <StaticQuery
      query={detailsQuery ?? ""}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: "description",
                content: metaDescription
              },
              {
                property: "og:site_name",
                content: data.site.siteMetadata.title
              },
              {
                property: "og:title",
                content: title
              },
              {
                property: "og:description",
                content: metaDescription
              },
              {
                property: "og:type",
                content: type ? type : "website"
              },
              {
                property: "og:url",
                content: slug ? `${data.site.siteMetadata.siteUrl}${slug}` : data.site.siteMetadata.siteUrl
              },
              {
                name: "twitter:card",
                content: "summary_large_image"
              },
              {
                name: "twitter:creator",
                content: `@${data.site.siteMetadata.social.twitter}`
              },
              {
                name: "twitter:title",
                content: title
              },
              {
                name: "twitter:description",
                content: metaDescription
              },
              {
                name: "twitter:widgets:new-embed-design",
                content: "on"
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                    name: "keywords",
                    content: keywords.join(", ")
                  }
                  : []
              )
              .concat(meta)
              .concat(
                image
                  ? [
                    {
                      name: "og:image",
                      content: image
                    },
                    {
                      name: "twitter:image:src",
                      content: image
                    }
                  ]
                  : []
              )}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`;

const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Full-Stack with Benefits",
    author: "Manuel Spagnolo",
    description: "Blogging about tech, coffee and other good things.",
    siteUrl: "https://fullstackwithbenefits.netlify.com",
    social: {
      twitter: "spagmanuel",
      instagram: "spagmanuel"
    }
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      footnotes: true,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem"
            }
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-reading-time",
          "gatsby-remark-autolink-headers"
        ]
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    "gatsby-plugin-feed",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Full-Stack with Benefits",
        short_name: "Full-Stack with Benefits",
        start_url: "/home",
        background_color: "#fff",
        theme_color: "#f56a14",
        display: "standalone",
        icon: "static/assets/icon.png",
        include_favicon: true
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "~pages": path.join(__dirname, "src/pages"),
        "~templates": path.join(__dirname, "src/templates"),
        "~components": path.join(__dirname, "src/components"),
        "~theme": path.join(__dirname, "src/theme"),
        "~utils": path.join(__dirname, "src/utils"),
        "~": path.join(__dirname, "src"),
        "/static": path.join(__dirname, "static")
      }
    },
    "gatsby-plugin-portal",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/
        }
      }
    }
  ]
};

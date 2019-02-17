const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const readArticle = path.resolve(`./src/pages/ReadArticle/index.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
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
                title,
                description,
                tags,
                cover_image,
                published,
                date
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      if (post.node.frontmatter.published) {
        createPage({
          path: post.node.fields.slug,
          component: readArticle,
          context: {
            slug: post.node.fields.slug,
            tags: post.node.frontmatter.tags,
            readingTime: post.node.fields.readingTime
          }
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}

const path = require("path");
const {createFilePath} = require("gatsby-source-filesystem");

const getPagePath = (page) => {
  return path.resolve(`./src/pages/${page}/index.js`);
};

const createArticlesPages = async ({graphql, actions}) => {
  const readArticlePageComponent = getPagePath("ReadArticle");

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
                readingTime {
                  minutes
                }
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create articles pages
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post) => {
    actions.createPage({
      path: post.node.fields.slug,
      component: readArticlePageComponent,
      context: {
        slug: post.node.fields.slug,
        relativePath: post.node.fields.relativePath,
        tags: post.node.frontmatter.tags,
        readingTime: post.node.fields.readingTime
      }
    });
  });

  return {
    featuredArticleId: posts[0].node.id
  };
};

const createSearchPage = async ({actions}) => {
  const searchPageComponent = getPagePath("Search");

  actions.createPage({
    path: "/search/",
    component: searchPageComponent
  });
};

const createHomePage = async ({actions, featuredArticleId}) => {
  const homePageComponent = getPagePath("Home");

  actions.createPage({
    path: "/home",
    component: homePageComponent,
    context: {
      featuredArticleId
    }
  });
};

exports.createPages = ({graphql, actions}) => {
  return Promise
    .all([
      createArticlesPages({graphql, actions}),
      createSearchPage({actions})
    ])
    .then(([{featuredArticleId}]) => {
      return createHomePage({actions, featuredArticleId});
    });
};

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({node, getNode});
    const relativeFilePath = path.relative(__dirname, node.fileAbsolutePath);

    createNodeField({
      name: "slug",
      node,
      value: slug
    });

    createNodeField({
      name: "relativeFilePath",
      node,
      value: relativeFilePath
    });
  }
};

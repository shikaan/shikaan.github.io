const path = require("path");

// FIXME: this is a temporary hack, as it looks like there is no way to
//  pass parameters to 404
let featuredArticleId;

const getPagePath = (page) => {
  return path.resolve(`./src/pages/${page}/index.js`);
};

const createArticlesPages = async ({graphql, actions}) => {
  const readArticlePageComponent = getPagePath("ReadArticle");

  const result = await graphql(
    `
      {
        allContentfulArticle(sort: {fields: publishDate, order: DESC}, limit: 1000) {
          edges {
            node {
              id
              tags
              slug
              timeToRead
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
  const posts = result.data.allContentfulArticle.edges;

  posts.forEach((post) => {
    actions.createPage({
      path: post.node.slug,
      component: readArticlePageComponent,
      context: {
        slug: post.node.slug,
        tags: post.node.tags,
        readingTime: post.node.timeToRead
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

  actions.createRedirect({fromPath: "/", toPath: "/home", isPermanent: true});
};

exports.createPages = ({graphql, actions}) => {
  return Promise
    .all([
      createArticlesPages({graphql, actions}),
      createSearchPage({actions})
    ])
    .then(([{featuredArticleId: faid}]) => {
      featuredArticleId = faid;

      return createHomePage({actions, featuredArticleId});
    });
};

exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === "MarkdownRemark") {

    createNodeField({
      name: "slug",
      node,
      value: getNode(getNode(node.parent).parent).slug
    });
  }
};

exports.onCreatePage = ({page, actions}) => {
  if (!page.path.includes("404")) {
    actions.deletePage(page);
  } else {
    if (!page.context.featuredArticleId) {
      page.context.featuredArticleId = featuredArticleId;
    }
  }
};

exports.createResolvers = ({createResolvers}) => {
  const resolvers = {
    ContentfulArticle: {
      timeToRead: {
        type: "String",
        resolve(source, args, context, info) {
          const body = context.nodeModel.getNodeById({id: source.body___NODE});
          const markdown = context.nodeModel.getNodeById({id: body.children[0]});

          return Math.ceil(markdown.fields.readingTime.minutes);
        },
      },
    },
  };
  createResolvers(resolvers);
};

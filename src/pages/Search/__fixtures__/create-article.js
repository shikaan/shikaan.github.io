export const createArticle = (topics, title = 'title') => {
  return {
    node: {
      fields: {
        readingTime: {
          minutes: 1
        }
      },
      frontmatter: {
        title,
        date: "date",
        tags: topics,
        coverImage: {
          childImageSharp: {
            fixed: {
              width: 112,
              height: 112,
              base64: "base64",
              tracedSVG: "tracedSVG",
              aspectRatio: 1,
              src: "src",
              srcSet: "srcSet",
              srcWebp: "srcWebp",
              srcSetWebp: "srcSetWebp",
              originalName: "originalName"
            }
          }
        }
      }
    }
  }
}

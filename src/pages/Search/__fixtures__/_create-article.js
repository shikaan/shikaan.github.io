export const createArticle = (topics, title = "title") => {
  return {
    node: {
      slug: "slug",
      title,
      publishDate: "June 14, 2020",
      tags: topics ?? [
        "cache",
        "frontend",
        "backend",
        "python"
      ],
      body: {
        "childMarkdownRemark": {
          "timeToRead": 7
        }
      },
      coverImage: {
        fluid: {
          base64: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAAKABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAcCBAUG/8QAJRAAAgEEAAQHAAAAAAAAAAAAAQIDAAQFEQYhMWETIkFCgbHR/8QAFgEBAQEAAAAAAAAAAAAAAAAABAID/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAECEv/aAAwDAQACEQMRAD8AlZcF44YjVvtZinllcltHuOhFUZuD7lOTyRuoHNktgft64fFZG9AVhd3GweR8Vv2m+0jmwjYu2zGpJ32odJhT3mJx6XLCTLGF/VJLFkI+KK085PKck+5X6D3GitJuo5f/2Q==",
          aspectRatio: 1.965,
          src: "//images.ctfassets.net/rrd69nadniqd/5JjQhwkcdHbYN2kWfzAlib/5ac520012c6b363b334777752963fc1b/cover.jpg?w=800&q=50",
          srcSet: "//images.ctfassets.net/rrd69nadniqd/5JjQhwkcdHbYN2kWfzAlib/5ac520012c6b363b334777752963fc1b/cover.jpg?w=200&h=102&q=50 200w,\n//images.ctfassets.net/rrd69nadniqd/5JjQhwkcdHbYN2kWfzAlib/5ac520012c6b363b334777752963fc1b/cover.jpg?w=400&h=204&q=50 400w,\n//images.ctfassets.net/rrd69nadniqd/5JjQhwkcdHbYN2kWfzAlib/5ac520012c6b363b334777752963fc1b/cover.jpg?w=786&h=400&q=50 786w",
          sizes: "(max-width: 800px) 100vw, 800px"
        }
      }
    }
  };
};

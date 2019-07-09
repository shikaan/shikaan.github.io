# Contributing
---

_Full-Stack with Benefit_ is a community driven blog. 

This means that you can contribute either adding and amending existing content or you can contribute and make the platform better,

## Content Contribution

Usual topics in this blog are Software Development, Science and Technology, but this rule is really not set in stone: feel free to write about anything you feel like.

Articles are witten in [markdown](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf) and linted using [`remark`](https://github.com/remarkjs/remark). 

The configuration for remark can be found in the `.remarkrc` file.

### How do I write a _new_ article?

Writing a new article is as easy as adding a new folder in the `content/blog` directory with an `index.md` file inside.

> **Example**
>
> Let's say you want to add a new article about grooming dogs. What you need to do is creating a `grooming-dogs` folder with an `index.md` file inside.
>
> The final directory structure should look like:
> ```
> content
>   | - blog
>      | - grooming-dogs
>         | - index.md
> ```

### How do modify an existing article?

Modifying an existing article can be done by editing the existing `index.md` inside one of the folders in the `content/blog` directory. 

### Gotchas

#### Frontmatter

All the articles need to start with a block which defines article's metadata. This block is called `frontmatter` and reads something like:

```
title: Grooming Dogs
tags: ["dogs", "grooming"]
description: Make your dog beautiful
coverImage: "cover.jpg"
date: "2019-07-06T00:00:00.000Z"
commentLink: "https://twitter.com/spagmanuel/status/1118948844925063169"
```

The fields are:

- **title**: how the article gets indexed in the main page, in the search and also by crawlers for SEO;
- **tags**: defines the categories for a given blog post. It's used by the internal search a*nd for SEO;
- **description**: small description of post content. It's shown in the article preview cards;
- **coverImage**: defines the article cover image and also the image shown in the preview on Facebook, Twitter and so forth. It can be a relative path (from the article folder) or a URL;
- **date**: publication date in ISO format. Its creation will eventually be automated;
- **commentLink**: it's the link to the Twitter post associated to the article.

#### Articles URL

The directory name will become the URL where the article is going to be published. Chose it carefully and try to not edit it ever: changing at a later stage will impact SEO performance of your article. 

In the example above the URL will look like: https://withbenefits.dev/grooming-dogs

#### Images

Memes, GIFs and diagrams can go long way with regards to convey a message. For this reason, images in this blog are optmized in order to provide the best experience possible to the users.

Images that needs to be hosted in this repository for content purposes, are to be placed in the same directory as the article iteself. Links in the article re going to be relative to the article's directory:

> **Example**
> 
> In the example above, suppose we have an image such as `puppy.jpg`. Folder structure is going to look like:
> The final directory structure should look like:
> ```
> content
>   | - blog
>      | - grooming-dogs
>         | - index.md
>         | - puppy.jpg
> ```
> And links in the article will read like:
>
> ```md
> ![Puppy](./puppy.jpg)
> ```
Technical Contribution
===

This web application is written in [React](https://reactjs.org/) using [Gatsby](https://www.gatsbyjs.org/). Some of the conventions are borrowed from (sometimes enforced by) Gatsby itself, so here we are going to outline only the main points which differs.

## Setting up local environment

Following steps assume that latest [NodeJS LTS](https://nodejs.org/en/download/) is installed on the machine.

```bash
# clone repository locally
git clone https://github.com/shikaan/full-stack-with-benefits

# cd into the folder
cd full-stack-with-benefits

# install dependencies
npm i
```

The steps above will prepare your local environment installing all the dependencies and setting up all the [git hooks](https://githooks.com/) meant to help you throughout the development. 

You will get the following hooks:
  * `commit-msg`: checks the message preventing commits not abiding to [conventional commit guidelines](https://www.conventionalcommits.org);
  * `prepush`: runs unit tests and linters to avoid bad code to sneak into origin;

## Folder structure

Given the size of this application, we tried to keep the directory structure as streamlined as possible.

### Source (`src`)

This folder includes obviously source code for our application. It includes the following folders:

  * **components**: All reusable presentational components which - put together - contribute to create the pages. They live along with their tests;

  * **pages**; All the pages which compose the application. Pages are composed of _sections_ which are namely the components you find in those folders. Every page is meant ot be rendered in a _template_;

  * **templates**: Components which define the shell of pages holding shared pieces of the UI such as headers, menu, etc;

  * **theme**: These files hold the CSS-in-JS configuration which defines how the application look;

  * **utils**: These are general purpose utils which are used across the application;

### Test (`test`)

This folder contains all the configuration needed to run the tests. Tests are run by [Jest](https://jestjs.io/) and the bulk of the configuration is basically just supposed to make it get along with [Enzyme](https://airbnb.io/enzyme/).

### Static assets (`static`)

All the static files of this application are to be kept here. 

### Content (`content`)

This is the place where we store all the things which contribute to the "content" of this web application, namely the blog articles and all the other text you find on the page (e.g. menus, buttons...)

## Theming and styling

> **Disclaimer**
>
> This application is my first experiment with CSS-in-JS, so please be kind when you can.

The reason why the CSS-in-JS approach has been chosen is that supporting multiple themes is supposed to be easier. Like all the cool kids I had to have at least a dark theme.

  * **global**: global styles which are not supposed to change among different themes. It includes some style reset, icon fonts and basic font configuration;
  * **colors**: this maps define the colors used in the current theme. Ideally this is the first thing to change to provide a different theme;
  * **size**: the `Size` class is meant to overcome one of the most annoying problem I have found in the CSS-in-JS approach: doing the math;
  * **typography**: this includes theme-specific font configuration. It includes size, faces and definition of primary and secondary fonts;
  * **variables**: these are utility variables meant to better communicate the intent in style configuration preventing to hard-code things like breakpoints and z-index.

## Page creation

> **Disclaimer**
>
> The choices made for this part are _very_ opinionated. 

The way Gatsby handles page creation is a bit too black-boxed for my taste. I just wanted to have a page per folder, `Home` included.

Unfortunately there is no easy way of doing this, but, thankfully, Gatsby also exposes a very nice [page API](https://www.gatsbyjs.org/docs/node-apis/) which allowed us to handle the page creation flow as we wanted.

Currently the flow looks like:

  * create (in parallel) pages which do not have dependencies;
  * create `Home` page afterwards.

The `Home` page has to be created at the end because need to pass it the `featuredArticleId`. Such id is then used by [the GraphQL query](../src/pages/Home/index.js) to fetch and highlight the featured article.
 

Contributing
===

_Full-Stack with Benefit_ is a community driven blog. 

This means that you can contribute either adding and amending existing content or you can participate making the platform better,

More information here:

* [Technical Documentation](./TECH.md)
* [Content Documentation](./CONTENT.md)

## Getting in touch

If you have questions, enquiries or you just feel like sharing your point of view about one of the topics reach the community out via one of the following

* [Twitter](https://twitter.com/spagmanuel) 
* [Dev.to](https://dev.to/shikaan) 
* [Email](mailto:spagnolo.manu@gmail.com)

> **Note:**
>
> Yes, at the moment the community is just me. Hopefully this will grow over time :D

## I have found a bug!

If you find something off with the application, feel free to contribute by filing an issue, if it isn't already part of [the list](https://github.com/shikaan/full-stack-with-benefits/issues).

[Issue templates]() will help you compile a detailed description of what is the problem and what is the desired outcome. This will help the community to organize and prioritize the issues, giving a good overview of the problem to whomever wants to contribute.

If you wish to contribute also with code, feel free to [read the documentation]() and [submit a pull request](https://github.com/shikaan/full-stack-with-benefits/pull/new/master).

## I have found an error in an article!

You can help with that too! File an issue with the `content` tag, but not before checking whether it has already been reported in [the list](https://github.com/shikaan/full-stack-with-benefits/issues).

Ideally issues regarding content should be opened only if the reason for change is to be discussed. For small changes (e.g. like typos, formatting issues...) you can [submit a pull request]() right away, without creating an issue.

## Submit a pull request

In order submit a code change users are supposed to [open a pull request](https://github.com/shikaan/full-stack-with-benefits/pull/new/master). 
Upon opening the pull request, make sure to fill the pull request template and that's pretty much it. 

The CI will then kick in checking for linting issues and running the unit tests and if something happens, you will be notified.

### Setting up local development environment

We suggest to clone the repository locally and test the changes you want to submit on your machine

```bash
# clone repository
git clone https://github.com/shikaan/full-stack-with-benefits.git

# cd into the folder
cd full-stack-with-benefits

# install dependencies and dev dependencies
npm i
```

### Conventional commit

In this repository we decided to stick with [conventional commit guidelines](https://www.conventionalcommits.org) for commit messages. 

As soon as you install the dependencies, a [git hook](https://githooks.com/) is setup in order to prevent you to push non-compliant commits.

You can test your commit message manually running

```bash
npx commitlint "fix: commit message"
```

### Testing

You can run the same tests as the CI does on your local machine to save time. Tests are run through [Jest](https://jestjs.io/)

```bash
# run the tests
npm test
```

### Linting

Again, you can run the same linting checks as the CI does. Code linting is done via [ESLint](https://eslint.org/) and Markdown linting via [remark](https://remark.js.org/)

```bash
# run linting
npm run lint
```
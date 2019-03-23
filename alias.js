// WORKAROUND TO MAKE WEBSTORM/PHPSTORM UNDERSTAND ALIASES
// https://youtrack.jetbrains.com/issue/WEB-22717#focus=streamItem-27-1558931-0-0

/* eslint-disable */

System.config({
  'paths': {
    '~/*': './src/*',
    '~components/*': './src/components/*',
    '~pages/*': './src/pages/*',
    '~templates/*': './src/templates/*',
    '~theme/*': './src/theme/*',
    '/static/*': './static/*',
    '/test/*': './test/*'
  }
})

/* eslint-enable */

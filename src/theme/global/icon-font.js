import cdd from '../../../static/fonts/cdd.woff'

// TODO: consider if adding woff2 is worth

/* eslint-disable */
export const iconFont = `
  @font-face {
    font-family: 'cdd';
    src: url(${cdd}) format('woff');
    font-weight: normal;
    font-style: normal;
}
  
  [class^="cdd-"], [class*=" cdd-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'cdd' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .cdd-coffee:before {
    content: "\\e900";
  }
  .cdd-search:before {
    content: "\\e901";
  }
  .cdd-close:before {
    content: "\\e902";
  }
  .cdd-comment:before {
    content: "\\e903";
  }
  .cdd-share:before {
    content: "\\e904";
  }
  .cdd-edit:before {
    content: "\\e905";
  }
`
/* eslint-enable */

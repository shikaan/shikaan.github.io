import fswb from "../../../static/fonts/fswb.woff";

// TODO: consider if adding woff2 is worth

export const iconFont = `
  @font-face {
    font-family: 'fswb';
    src: url(${fswb}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  [class^="fswb-"], [class*=" fswb-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'fswb' !important;
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

  .fswb-caret:before {
    content: "\\e906";
  }
  .fswb-coffee:before {
    content: "\\e900";
  }
  .fswb-search:before {
    content: "\\e901";
  }
  .fswb-close:before {
    content: "\\e902";
  }
  .fswb-comment:before {
    content: "\\e903";
  }
  .fswb-share:before {
    content: "\\e904";
  }
  .fswb-edit:before {
    content: "\\e905";
  }
`;

import { baseFontSize, baseLineHeight, secondaryFont } from "../typography";
import { color } from "../colors";

export const document = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;

    &:focus {
      outline: none !important;
    }
  }

  html,
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-variant-ligatures: none;
    text-rendering: optimizeLegibility;
    font-feature-settings: "liga";
    font-family: ${secondaryFont.fontFamily};
    font-size: ${baseFontSize};
    line-height: ${baseLineHeight};
    -webkit-overflow-scrolling: auto;
  }

  body {
    overflow-x: hidden;
    color: ${color.dark600};
  }
  
  img {
    display: block;
    max-width: 100%;
  }
  
  a {
    color: inherit;
  }
`;

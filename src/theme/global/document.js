import { baseFontSize, baseLineHeight, secondaryFont } from '../typography'
import { color } from '../colors'

const baseBoxSizing = 'border-box'

export const document = `
  *,
  *::before,
  *::after {
    box-sizing: ${baseBoxSizing};

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
    background-color: ${color.lightCoffee};
  }
  
  img {
    display: block;
    max-width: 100%;
  }
  
  a {
    color: inherit;
  }
`

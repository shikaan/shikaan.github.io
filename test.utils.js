import React from "react";
import {ThemeProvider} from "styled-components";

import baseTheme from '~theme'

export const renderWithTheme = (comopnent, theme = baseTheme) => {
  return <ThemeProvider theme={theme} children={comopnent}/>
}

export const getFirstChild = ({root}) => root.children[0]

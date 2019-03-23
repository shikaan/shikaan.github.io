import React from "react";
import cheerio from "cheerio";
import {ThemeProvider} from "styled-components";
import {mount, shallow} from "enzyme";

export const getTagNameByHTMLString = (htmlString) => {
  return cheerio.parseHTML(htmlString)[0].name
}

/**
 * @param tree
 * @param theme
 * @returns {ShallowWrapper<C["props"], C["state"], React.Component> | ShallowWrapper<any, any>}
 */
export const shallowWithTheme = (tree, theme) => {
  return shallow(
    <ThemeProvider theme={theme}>
      {tree}
    </ThemeProvider>)
}

/**
 * @param tree
 * @param theme
 * @returns {ReactWrapper<C["props"], C["state"], React.Component> | ReactWrapper<any, any>}
 */
export const mountWithTheme = (tree, theme) => {
  return mount(
    <ThemeProvider theme={theme}>
      {tree}
    </ThemeProvider>)
}

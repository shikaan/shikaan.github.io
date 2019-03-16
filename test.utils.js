import cheerio from "cheerio";

export const getTagNameByHTMLString = (htmlString) => {
  return cheerio.parseHTML(htmlString)[0].name
}

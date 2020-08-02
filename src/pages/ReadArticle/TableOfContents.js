import React, { useState } from "react";
import styled from "styled-components";
import Icon from "~components/Icon";
import {getMicrocopy} from "~/utils";

const bodyTwoStyle = (theme) => `
  font-family: ${theme.typography.secondaryFont.fontFamily};
  font-weight: 400;
  font-size: ${theme.typography.baseFontSize};
`;

const Content = styled.nav`
  font-family: ${({ theme }) => theme.typography.secondaryFont.fontFamily};
  padding: 0 ${({ theme }) => theme.templateVariables.horizontalPadding};
`;

const ContentHeader = styled.header`
  ${({ theme }) => bodyTwoStyle(theme)}
  font-weight: 700;
  padding: ${({ theme }) =>
    `${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding}`};
  cursor: pointer;
`;

const ContentSection = styled.section(
  ({ theme, closed }) => `

  height: ${closed ? 0 : "auto"};
  overflow: hidden;


  padding: 0 ${theme.templateVariables.horizontalPadding} ${
    closed ? 0 : theme.templateVariables.verticalPadding.multiply(2)
  } ${theme.templateVariables.horizontalPadding};

  
  & > ul {
    padding: 0 ${theme.typography.baseFontSize.multiply(.5)};
    list-style-position: inside;
     
    p {
        display: inline;
    }
    
    ul {
      color: ${theme.color.dark500};
    }
    
    a {
      ${bodyTwoStyle(theme)}
      text-decoration: none;
      padding: ${theme.templateVariables.verticalPadding.multiply(.5)} 0;
      display: inline-block;
      width: calc(100% - ${theme.templateVariables.horizontalPadding});
    }
    
    li {      
      font-size: ${theme.typography.baseFontSize};
      list-style-type: disc;
      list-style-position: inside;
      
      li {
        list-style-type: circle;
        padding-left: ${theme.typography.baseFontSize};
      }
     }
  }
`
);

const Caret = styled(Icon)(({ closed }) => `
  float: right;
  ${closed ? "" : "transform: rotate(180deg);"}
`);

const TableOfContents = ({ content, post }) => {
  const [closed, setClosed] = useState(false);

  return (
    <Content>
      <ContentHeader onClick={() => setClosed(!closed)}>
        {content.title}
        <Caret closed={closed} icon="caret" />
      </ContentHeader>
      <ContentSection
        closed={closed}
        dangerouslySetInnerHTML={{
          __html: post.body.childMarkdownRemark.tableOfContents,
        }}
      />
    </Content>
  );
};

export default TableOfContents;

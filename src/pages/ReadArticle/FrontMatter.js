import React, {Component, Fragment} from "react";
import styled from "styled-components";

import Heading from "~components/Heading";
import Image from "~components/Image";
import Overline from "~components/Overline";
import Tag from "~components/Tag";
import {getMicrocopy} from "~/utils";

const Header = styled.header(({theme}) => `
  padding: ${theme.templateVariables.verticalPadding} ${theme.templateVariables.horizontalPadding};
`);

const FrontMatterHeading = styled(Heading)(({theme}) => `
  padding-bottom: ${theme.templateVariables.verticalPadding};
`);

class FrontMatter extends Component {
  render() {
    const {content, article, tags} = this.props;

    return (
      <Fragment>
        <Image fluid={article.coverImage.fluid} alt={article.title}/>
        <Header>
          <Overline>
            {article.publishDate} – {article.timeToRead} {getMicrocopy(content.microcopy, "shared.reading-time")}
          </Overline>

          <FrontMatterHeading level={1} sub={article.description}>
            {article.title}
          </FrontMatterHeading>

          {tags.map(i => <Tag key={i} to={`/search?query=${i}`}>{i}</Tag>)}
        </Header>
      </Fragment>
    );
  }
}

export default FrontMatter;

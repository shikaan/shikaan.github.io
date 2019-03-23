import React from "react";
import "jest-styled-components";
import {shallow} from "enzyme";

import Tag from "./Tag";
import themeMock from "~theme";
import {getTagNameByHTMLString} from "/test/utils";

describe("Tag", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Tag theme={themeMock}>text</Tag>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders an anchor", () => {
    const wrapper = shallow(
      <Tag theme={themeMock}>text</Tag>
    );

    expect(getTagNameByHTMLString(wrapper.html())).toContain("a");
  });

  describe("renders text in PascalCase prefixed by #", () => {
    it("one word", () => {
      const wrapper = shallow(
        <Tag theme={themeMock}>text</Tag>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it("more words with spaces", () => {
      const wrapper = shallow(
        <Tag theme={themeMock}>text one</Tag>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it("more words with dashes", () => {
      const wrapper = shallow(
        <Tag theme={themeMock}>text-one</Tag>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it("more words with underscores", () => {
      const wrapper = shallow(
        <Tag theme={themeMock}>text_one</Tag>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});

import React from "react";
import "jest-styled-components";

import {mountWithTheme} from "/test/utils";
import themeMock from "~theme";

import Card, {CONTEXT} from "./Card.js";

const fixtures = {
  mockCardContent: {
    slug: "slug",
    image: {
      fixed: {
        width: 1,
        height: 1,
        src: "src",
        srcSet: "srcSet",
        base64: "base64",
        tracedSVG: "tracedSVG",
        srcWebp: "srcWebp",
        srcSetWebp: "srcSetWebp"
      }
    },
    title: "title",
    description: "description",
    overline: "overline",
    replaceOnTagNavigate: false,
    tags: ["test", "test-too"]
  }
};

describe("Card", () => {
  describe("with context polaroid", () => {
    it("renders correctly", () => {
      const wrapper = mountWithTheme(<Card {...fixtures.mockCardContent} context={CONTEXT.POLAROID} />, themeMock);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("with context list", () => {
    it("renders correctly", () => {
      const wrapper = mountWithTheme(<Card {...fixtures.mockCardContent} context={CONTEXT.LIST} />, themeMock);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("with context featured", () => {
    it("renders correctly", () => {
      const wrapper = mountWithTheme(<Card {...fixtures.mockCardContent} context={CONTEXT.FEATURED} />, themeMock);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("with no context", () => {
    it("renders correctly and defaults to list", () => {
      const wrapper = mountWithTheme(<Card {...fixtures.mockCardContent} />, themeMock);

      expect(wrapper.props().children.props.context).toEqual(CONTEXT.LIST);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

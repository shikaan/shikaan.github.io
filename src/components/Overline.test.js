import React from "react";
import "jest-styled-components";

import Overline from "./Overline";
import themeMock from "~theme";
import {shallowWithTheme} from "/test/utils";

describe("Overline", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithTheme(<Overline>text</Overline>, themeMock);

    expect(wrapper).toMatchSnapshot();
  });
});

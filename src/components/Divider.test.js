import React from "react";
import "jest-styled-components";

import Divider from "./Divider.js";
import themeMock from "~theme";
import {shallowWithTheme} from "/test/utils";

describe("Divider", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithTheme(<Divider/>, themeMock);

    expect(wrapper).toMatchSnapshot();
  });
});

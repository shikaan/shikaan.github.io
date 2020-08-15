import React from "react";
import "jest-styled-components";

import Input from "./Input";
import {shallowWithTheme} from "/test/utils";
import themeMock from "~theme";

describe("Input", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithTheme(<Input />, themeMock);

    expect(wrapper).toMatchSnapshot();
  });
});

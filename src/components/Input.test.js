import React from "react";
import {shallow} from "enzyme";
import "jest-styled-components";

import Input from "./Input";

describe("Input", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Input/>);

    expect(wrapper).toMatchSnapshot();
  });
});

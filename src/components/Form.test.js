import React from "react";
import {shallow} from "enzyme";
import "jest-styled-components";

import Form from "./Form.js";

describe("Form", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Form/>);

    expect(wrapper).toMatchSnapshot();
  });
});

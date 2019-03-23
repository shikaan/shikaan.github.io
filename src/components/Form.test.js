import React from "react";
import {shallow, mount} from "enzyme";
import "jest-styled-components";

import themeMock from "~theme";

import Form from "./Form.js";

describe("Form", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Form/>);

    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import {shallow} from "enzyme";
import "jest-styled-components";
import {mountWithTheme} from "/test/utils";

import themeMock from "~theme";
import Button from "~components/Button";

import Banner from "./Banner.js";

describe("Banner", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Banner/>);

    expect(wrapper).toMatchSnapshot();
  });

  it("calls ctaAction when button is clicked", () => {
    const ctaActionStub = jest.fn();
    const wrapper = mountWithTheme(<Banner ctaLabel={"label"} ctaAction={ctaActionStub}/>, themeMock);

    wrapper.find(Button).simulate("click");

    expect(ctaActionStub).toHaveBeenCalled();
  });

  it("renders cta only if label is provided", () => {
    const wrapperWithoutCTA = mountWithTheme(<Banner />, themeMock);
    const wrapperWithCTA = mountWithTheme(<Banner ctaLabel={"label"} />, themeMock);

    expect(wrapperWithoutCTA.find(Button)).toHaveLength(0);
    expect(wrapperWithCTA.find(Button)).not.toHaveLength(0);
  });
});

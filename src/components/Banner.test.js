import React from "react";
import {shallow} from "enzyme";
import "jest-styled-components";
import {mountWithTheme} from "/test/utils";

import themeMock from "~theme";
import Button from "~components/Button";

import Banner from "./Banner.js";

describe("Banner", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Banner visible={true} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("calls onAction when button is clicked", () => {
    const onActionStub = jest.fn();
    const wrapper = mountWithTheme(<Banner visible={true} actionLabel={"label"} onAction={onActionStub}/>, themeMock);

    wrapper.find(Button).simulate("click");

    expect(onActionStub).toHaveBeenCalled();
  });

  it("renders cta only if actionLabel is provided", () => {
    const wrapperWithoutCTA = mountWithTheme(<Banner visible={true} />, themeMock);
    const wrapperWithCTA = mountWithTheme(<Banner visible={true} actionLabel={"label"} />, themeMock);

    expect(wrapperWithoutCTA.find(Button)).toHaveLength(0);
    expect(wrapperWithCTA.find(Button)).not.toHaveLength(0);
  });

  it("calls onDismiss when button is clicked", () => {
    const onDismissedStub = jest.fn();
    const wrapper = mountWithTheme(<Banner visible={true} dismissLabel={"label"} onDismissed={onDismissedStub}/>, themeMock);

    wrapper.find(Button).simulate("click");

    expect(onDismissedStub).toHaveBeenCalled();
  });

  it("renders dismiss only if label is provided", () => {
    const wrapperWithoutCTA = mountWithTheme(<Banner visible={true} />, themeMock);
    const wrapperWithCTA = mountWithTheme(<Banner visible={true} dismissLabel={"label"} />, themeMock);

    expect(wrapperWithoutCTA.find(Button)).toHaveLength(0);
    expect(wrapperWithCTA.find(Button)).not.toHaveLength(0);
  });
});

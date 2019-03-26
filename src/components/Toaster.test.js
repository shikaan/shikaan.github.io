import React from "react";
import {shallow} from "enzyme";
import Toaster from "./Toaster";
import "jest-styled-components";

import themeMock from "~theme";
import {mountWithTheme} from "/test/utils";


describe("Toaster", () => {
  beforeAll(() => {
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal");
    global.document.body.appendChild(portalRoot);
  });

  afterAll(() => {
    global.document.getElementById("portal").remove();
  });

  it("renders correctly", () => {
    const wrapper = shallow(<Toaster/>);

    expect(wrapper).toMatchSnapshot();
  });

  it("shows up on visible=true", () => {
    const wrapper = mountWithTheme(<Toaster visible={true}/>, themeMock);

    expect(wrapper.root()).toHaveStyleRule("opacity", "1");
    expect(wrapper.root()).toHaveStyleRule("z-index", themeMock.zIndexRank.top);
  });

  it("is hidden on visible=false", () => {
    const wrapper = mountWithTheme(<Toaster visible={false}/>, themeMock);

    expect(wrapper.root()).toHaveStyleRule("opacity", "0");
    expect(wrapper.root()).toHaveStyleRule("z-index", themeMock.zIndexRank.bottom);
  });

  it("renders provided text", () => {
    const wrapper = mountWithTheme(<Toaster visible={false}>text</Toaster>, themeMock);

    expect(wrapper.text()).toEqual("text");
  });
});

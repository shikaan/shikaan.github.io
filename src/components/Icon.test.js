import React from "react";
import {shallow} from "enzyme";
import "jest-styled-components";

import Icon from "./Icon.js";

const fixutres = {
  icon: "icon",
  className: "className"
};

describe("Icon", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Icon icon={fixutres.icon}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it("adds the class matching provided icon", () => {
    const wrapper = shallow(<Icon icon={fixutres.icon}/>);

    expect(wrapper.exists(`.fswb-${fixutres.icon}`)).toBeTruthy();
  });

  it("allows other classes along with icon", () => {
    const wrapper = shallow(<Icon className={fixutres.icon} icon={fixutres.icon}/>);

    expect(wrapper.exists(`.${fixutres.icon}.fswb-${fixutres.icon}`)).toBeTruthy();
  });
});

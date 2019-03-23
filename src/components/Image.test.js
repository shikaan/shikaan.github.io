import React from "react";
import {shallow, mount} from "enzyme";
import "jest-styled-components";

import themeMock from "~theme";

import Image from "./Image.js";

const fixtures = {
  src: "src.png",
  fixed: {
    width: 1,
    height: 1,
    src: "src.png",
    srcSet: "src.png, src.png 1.5x"
  }
};

describe("Image", () => {
  it("renders an <img> tag if src is passed", () => {
    const wrapper = shallow(<Image src={fixtures.src}/>);

    expect(wrapper.find("img")).toHaveLength(1);
  });

  it("renders a Gatsby Image if Gatsby Image content is passed", () => {
    const wrapper = shallow(<Image fixed={fixtures.fixed}/>);

    console.log(wrapper.html())


    expect(wrapper.find("picture")).toHaveLength(1);
  });
});

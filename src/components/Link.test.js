import React from "react";
import {shallow, mount} from "enzyme";
import "jest-styled-components";
import {noop} from "lodash";

import {getTagNameByHTMLString, mountWithTheme} from "/test/utils";
import themeMock from "~theme";

import Link from "./Link";
import {Link as GatsbyLink} from "gatsby";

describe("Link", () => {
  it("renders a button if onClick is set", () => {
    const wrapper = shallow(<Link theme={themeMock} onClick={noop}>link</Link>);

    expect(getTagNameByHTMLString(wrapper.html())).toEqual("button");
  });

  it("renders an anchor if href is passed", () => {
    const wrapper = shallow(<Link theme={themeMock} href={"somewhere"}>link</Link>);

    expect(getTagNameByHTMLString(wrapper.html())).toEqual("a");
  });

  it("renders Gatsby Link else", () => {
    const wrapper = mountWithTheme(<Link to={"somewhere-else"}>link</Link>, themeMock);

    expect(wrapper.childAt(0).childAt(0).childAt(0).type()).toEqual(GatsbyLink);
  });

  it("renders children", () => {
    const children = "text";
    const wrapper = mount(<Link theme={themeMock} to={"somewhere-else"} children={children}/>);

    expect(wrapper).toMatchSnapshot();
  });
});

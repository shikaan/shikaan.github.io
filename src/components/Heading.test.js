import React from 'react'
import {shallow} from 'enzyme';
import 'jest-styled-components';

import themeMock from '~theme'

import Heading from "./Heading.js";
import {getTagNameByHTMLString, shallowWithTheme} from "/test/utils";
import {CONTEXT} from "./Heading";

describe('Heading', () => {
  it('renders sub if provided', () => {
    const wrapper = shallow(<Heading theme={themeMock} sub={'sub'}/>)

    expect(wrapper).toMatchSnapshot()
  })

  it('does not render sub if not provided', () => {
    const wrapper = shallow(<Heading theme={themeMock}/>)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders h$N where $N is the level provided', () => {
    for (let i = 1; i <= 3; i++) {
      const wrapper = shallowWithTheme(<Heading level={i}/>, themeMock)

      expect(getTagNameByHTMLString(wrapper.html())).toEqual(`h${i}`)
    }
  })

  it('renders correctly with CONTEXT.DISPLAY', () => {
    const wrapper = shallowWithTheme(<Heading context={CONTEXT.DISPLAY} />, themeMock)

    expect(wrapper).toMatchSnapshot()
  })
})

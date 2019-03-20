import React from 'react'
import {shallow} from 'enzyme';
import 'jest-styled-components';

import HomePage from ".";

describe('HomePage', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HomePage/>)

    expect(wrapper).toMatchSnapshot()
  })
})

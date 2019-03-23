import React from 'react'
import {shallow} from 'enzyme';
import 'jest-styled-components';

import Divider from "./Divider.js";

describe('Divider', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Divider/>)

    expect(wrapper).toMatchSnapshot()
  })
})

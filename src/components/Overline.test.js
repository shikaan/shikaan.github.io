import React from 'react'
import {shallow} from 'enzyme';
import 'jest-styled-components';

import Overline from "./Overline";

describe('Overline', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Overline/>)

    expect(wrapper).toMatchSnapshot()
  })
})

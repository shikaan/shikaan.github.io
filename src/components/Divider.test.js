import React from 'react'
import {shallow, mount} from 'enzyme';
import 'jest-styled-components';

import themeMock from '~theme'

import Divider from "./Divider.js";

describe('Divider', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Divider/>)

    expect(wrapper).toMatchSnapshot()
  })
})

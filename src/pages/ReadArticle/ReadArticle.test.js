import React from 'react'
import {shallow} from 'enzyme';
import 'jest-styled-components';

import ReadArticle from ".";

describe('ReadArticle', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ReadArticle/>)

    expect(wrapper).toMatchSnapshot()
  })
})

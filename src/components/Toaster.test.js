import React from 'react'
import {shallow, mount} from "enzyme";
import Toaster from "./Toaster";
import 'jest-styled-components';

import themeMock from '~theme'


describe('Toaster', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Toaster/>)

    expect(wrapper).toMatchSnapshot()
  });

  it('shows up on visible=true', () => {
    const wrapper = mount(<Toaster theme={themeMock} visible={true}/>)

    expect(wrapper.root()).toHaveStyleRule('opacity', '1')
    expect(wrapper.root()).toHaveStyleRule('z-index', themeMock.zIndexRank.top)
  });

  it('is hidden on visible=false', () => {
    const wrapper = mount(<Toaster theme={themeMock} visible={false}/>)

    expect(wrapper.root()).toHaveStyleRule('opacity', '0')
    expect(wrapper.root()).toHaveStyleRule('z-index', themeMock.zIndexRank.bottom)
  });

  it('renders provided text', () => {
    const wrapper = mount(
      <Toaster theme={themeMock} visible={false}>
        text
      </Toaster>
    )

    expect(wrapper.text()).toEqual('text')
  });
});

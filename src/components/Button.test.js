import React from 'react'
import 'jest-styled-components';

import themeMock from '~theme'
import {shallowWithTheme} from "../../test.utils";

import Button, {CONTEXT} from "./Button";

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = shallowWithTheme(<Button/>, themeMock)

    expect(wrapper).toMatchSnapshot()
  })

  it('renders correctly with context', () => {
    const wrapper = shallowWithTheme(<Button context={CONTEXT.COFFEE}/>, themeMock)

    expect(wrapper).toMatchSnapshot()
  })
})

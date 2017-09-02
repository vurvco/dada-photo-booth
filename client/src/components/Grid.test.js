/* eslint-env jest */

import React from 'react';
import Grid from './Grid';
import { shallow } from 'enzyme';

it('renders a div', () => {
  const comp = shallow(<Grid urls={[]} />);
  expect(comp.type()).toBe('div');
});

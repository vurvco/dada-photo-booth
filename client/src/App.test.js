/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';
import App, { subset } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('returns an array of the specified length', () => {
  const len = 8;
  const arr = new Array(10).fill(0);
  expect(subset(arr, len).length).toBe(len);
});

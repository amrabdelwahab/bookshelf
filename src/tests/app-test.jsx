import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const App = require('../components/app.jsx').default;

describe('App', () => {
  it('renders three components', () => {
    const rendered = TestUtils.renderIntoDocument(
      <App/>
    );
    expect(rendered).to.exist;
  });
});


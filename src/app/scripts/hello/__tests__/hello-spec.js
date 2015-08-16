'use strict';

var React;
var TestUtils;

jest.dontMock('../HelloComponent');

var HelloComponent;

beforeEach(() => {
  React = require('react/addons');
  TestUtils = React.addons.TestUtils;

  HelloComponent = require('../HelloComponent');
});

describe('Hello', () => {

  it('contain the correct text', function () {

    // Render a Test component in the document
    var hello = TestUtils.renderIntoDocument(
      <HelloComponent title="Hello world!"/>
    );
    // Verify that it has the correct content
    var title = TestUtils.findRenderedDOMComponentWithTag(hello, 'h2');
    expect(title.getDOMNode().textContent).toEqual('Hello world!');
  });

});

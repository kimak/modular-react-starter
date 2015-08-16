'use strict';

var React = require('react');

var HelloComponent = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },
  render: function () {

    return (
      <h2>{this.props.title}</h2>
    );
  }
});



module.exports = HelloComponent;

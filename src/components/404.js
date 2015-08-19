"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundRoute = React.createClass({
  render: function() {
    return (
      <div>
      <h1>Page Not Found</h1>
      <p>Whoops! Sorry, there is nothing to see here.</p>
      <p>Move along...</p>
      <Link to="app" className="btn btn-primary btn-medium">Back to Home</Link>
      </div>
    );
  }
});

module.exports = NotFoundRoute;

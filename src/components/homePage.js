"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>Development Courses</h1>
        <p>JavaScript related coding tutorials and exercises for ultra-responsive web apps.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
});

module.exports = Home;

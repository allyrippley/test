"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
  mixins: [
    Router.Navigation
  ],
  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },
  getInitialState: function() {
    return {
      author: { id: '', firstName: '', lastName: '' },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var authorId = this.props.params.id;
    if (authorId) {
      this.setState({author: AuthorStore.getAuthorById(authorId)});
    }
  },
  authorFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; //clear previous errors
    if(this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 characters';
      formIsValid = false;
    }
    if(this.state.author.lastName.length < 3) {
      this.state.errors.lastName = 'Last name must be at least 3 characters';
      formIsValid = false;
    }
    this.setState({erros: this.state.errors});
    return formIsValid;
  },
  setAuthorState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },
  saveAuthor: function(event) {
    event.preventDefault();
    var successMsg;
    if(!this.authorFormIsValid()) {
      return;
    }
    if(this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
      successMsg = 'Author updated!';
    } else {
      AuthorActions.createAuthor(this.state.author);
      successMsg = 'Author saved!';
    }
    this.setState({dirty: false});
    toastr.success(successMsg);
    this.transitionTo('authors');
  },
  render: function() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageAuthorPage;

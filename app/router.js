import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('journal', function() {
    this.route('new');
    this.route('show', {path: '/:id'}, function() {
      this.route('shares');
      this.route('edit');
    });
  });
  this.route('channels');
  this.route('login', function() {
    this.route('register');
  });
  this.route('users', function() {
    this.route('show', {path: '/:id'});
  });
  this.route('logout');
});

export default Router;

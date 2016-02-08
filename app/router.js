import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('entries', function() {
    this.route('new');
    this.route('show', {path: '/:id'}, function() {
      this.route('shares');
    });
  });
  this.route('channels');
  this.route('login');
  this.route('users', function() {
    this.route('show', {path: '/:id'});
  });
});

export default Router;

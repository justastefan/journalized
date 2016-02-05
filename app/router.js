import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('entries', function() {
    this.route('new');
  });
  this.route('channels');
  this.route('login');
});

export default Router;

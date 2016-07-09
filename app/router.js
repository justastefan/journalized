import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
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

/**
"ember": "2.2.0",
-    "ember-cli-shims": "0.1.0",
-    "ember-cli-test-loader": "0.2.2",
-    "ember-load-initializers": "0.1.7",
-    "ember-qunit-notifications": "0.1.0",
-    "jquery": "1.11.3",
-    "loader.js": "^3.5.0",
-    "qunit": "~1.20.0",
-    "eonasdan-bootstrap-datetimepicker": "~4.14.30",
-    "bootstrap": "^3.3.6",
-    "bootswatch": "^3.3.6"
*/

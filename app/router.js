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
  this.route('public', function() {});
  this.route('journals', function() {
    this.route('new');
    this.route('show', {path: '/:id'}, function() {
      this.route('users');
      this.route('edit');
    });
  });
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


"ember-cookie-monster": "0.0.2",
-    "ember-data": "^2.3.0",
-    "ember-disable-proxy-controllers": "^1.0.1",
-    "ember-export-application-global": "^1.0.4",
-    "ember-moment": "6.0.0",


"ember-route-action": "0.0.5",
-    "ember-route-action-helper": "0.2.0",
-    "emberx-file-input": "1.0.0",
-    "express": "^4.13.4",
-    "glob": "^4.5.3",
-    "moment": "2.11.2",
-    "moment-timezone": "0.5.0",
-    "morgan": "^1.6.1"

*/

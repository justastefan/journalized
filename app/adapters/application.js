import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  //host: 'https://api.example.com'
  authManager: Ember.inject.service(),

  headers: Ember.computed('authManager.ajaxHeaders', function() {
    // inject authentication header if available
  	this.get('authManager.ajaxHeaders');
  }),

  handleResponse(status) {
    if (status === 401) {
      if (this.get('authManager.isAuthenticated')) {
        this.get('authManager').invalidate();
      }
      return true;
    } else {
      return this._super(...arguments);
    }
  }
});

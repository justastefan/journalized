import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: 'http://journalized.inmem.dev',
  authManager: Ember.inject.service(),

  headers: Ember.computed('authManager.ajaxHeaders', function() {
    // inject authentication header if available
  	return this.get('authManager.ajaxHeaders');
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

import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  authManager: Ember.inject.service(),
  init() {
  },
  actions: {
    latestUserEntries() {
      // filter on 'isApproved'
      console.log('user id'+this.get('authManager.user.username'));
      return this.get('store').query('userEntry', {userId: this.get('authManager.user.id'), status: 'approved'});
    },
    latestOpenUserEntries() {
      // filter on 'isOpen'
      return this.get('store').query('userEntry', {userId: this.get('authManager.user.id'), status: 'open'});
    },
    latestRejectedUserEntries() {
      // filter on 'isOpen'
      return this.get('store').query('userEntry', {userId: this.get('authManager.user.id'), status: 'rejected'});
    }
  }
});

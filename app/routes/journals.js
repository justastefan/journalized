import Ember from 'ember';
import SecureRoute from '../mixins/secure-route';

export default Ember.Route.extend(SecureRoute, {
  store: Ember.inject.service(),
  authManager: Ember.inject.service(),
  model() {
    return this.store.query('journalUser', {user_id: this.get('authManager.user.id')});
  },
  actions: {
    createSuccess(journal) {
      this.refresh().then(() => {
        this.transitionTo('journals.show', journal);
      });
    },
    cancelCreate() {
      this.transitionTo('journals');
    }
  }
});

import Ember from 'ember';
import SecureRoute from '../../mixins/secure-route';

export default Ember.Route.extend(SecureRoute, {
  store: Ember.inject.service(),
  model(params) {
    console.log('params', params);
    return this.get('store').find('journal', params.id);
  },
  actions: {
  }
});

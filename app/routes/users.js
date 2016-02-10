import Ember from 'ember';
import SecureRoute from '../mixins/secure-route';

export default Ember.Route.extend(SecureRoute, {
  store: Ember.inject.service(),
  model() {
    return this.get('store').findAll('user');

    // list only the buddies
    var promise = this.get('store').find('user', 2)
    .then((user)=>{
      return user.get('buddies');
    }).then((buddies)=>{
      //debugger;
      console.log('buddies: '+buddies.length);
      return buddies;
    });
    return promise;
  }
});

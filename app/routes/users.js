import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').find('user', 2);
    // .then((user)=>{
    //   return user.get('buddies');
    // }).then((buddies)=>{
    //   //debugger;
    //   console.log('buddies: '+buddies.length);
    //   return buddies;
    // });
    // return promise;
  }
});

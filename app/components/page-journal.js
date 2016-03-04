import Ember from 'ember';

export default Ember.Component.extend({
  list: Ember.computed(function() {
    if (this.attrs.entries) {
      return this.attrs.entries();
    }
    return [];
  })
});

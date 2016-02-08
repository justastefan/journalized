import Ember from 'ember';

export default Ember.Component.extend({
  title: '',
  list: Ember.computed('entries.[]', function() {
    if (this.attrs.entries) {
      return this.attrs.entries();
    }
    return [];
  })
});

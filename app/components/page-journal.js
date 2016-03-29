import Ember from 'ember';

export default Ember.Component.extend({
  list: Ember.computed(function() {
    if (this.attrs.entries) {
      return this.attrs.entries();
    }
    return [];
  }),
  actions: {
    selectedUserEntry(entry) {
      if (this.attrs.selected) {
        this.attrs.selected(entry);
      }
    }
  }
});

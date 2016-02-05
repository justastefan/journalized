import Ember from 'ember';

export default Ember.Component.extend({
  authManager: null,
  currentPath: null,

  startsWith: function (prefix) {
    return this.get('currentPath').indexOf(prefix) === 0;
  },

  isActive: Ember.computed('currentPath', function() {
    var result = {
      index: this.startsWith('index'),
      entries: this.startsWith('entries'),
      channels: this.startsWith('channels')
    };
    return result;
  })
});

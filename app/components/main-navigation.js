import Ember from 'ember';

export default Ember.Component.extend({
  authManager: null,
  currentPath: null,
  authManager: Ember.inject.service(),

  startsWith: function (prefix) {
    return this.get('currentPath').indexOf(prefix) === 0;
  },

  isActive: Ember.computed('currentPath', function() {
    var result = {
      index: this.startsWith('index'),
      journal: this.startsWith('journal'),
      channels: this.startsWith('channels'),
      users: this.startsWith('users')
    };
    return result;
  })
});

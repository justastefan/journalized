import Ember from 'ember';

export default Ember.Component.extend({
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
  }),
  didInsertElement: function() {
    // Bootstrap collapsible navigation bar
    Ember.$('.nav li a').on('click', function(){
      Ember.run(function(){
        var toggle = Ember.$('.navbar-toggle');
        // Only click if toggle is visible and ...
        if (toggle && toggle.is(':visible') &&
            // ... menu item is not a dropdown toggle.
            !Ember.$(this).hasClass('dropdown-toggle')) {
              toggle.trigger("click");
        }
      });
    });
  }
});

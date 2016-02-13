import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // technical
  user: DS.belongsTo(),
  entry: DS.belongsTo(),
  // user specific
  isAuthor: DS.attr('boolean'),
  tags: DS.attr('string'),
  status: DS.attr('string'),
  rating: DS.attr('number'),
  tagList: Ember.computed('tags', function() {
    var tags = this.get('tags');
    if (tags && !Ember.isEmpty(tags)) {
      return tags.split(" ");
    }
    return [];
  })
});

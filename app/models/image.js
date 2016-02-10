import DS from 'ember-data';

export default DS.Model.extend({
  //article_id: "10219"
  name: DS.attr('string'),
  path: DS.attr('string'),
  thumb: DS.attr('string'),
  getSrc: Ember.computed('name','path', function() {
    return this.get('path')+this.get('name');
  })
});

import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  //article_id: "10219"
  name: DS.attr('string'),
  path: DS.attr('string'),
  thumb: DS.attr('string'),
  user: DS.belongsTo('user'),
  getSrc: Ember.computed('name','path', function() {
    return this.get('path')+this.get('name');
  })
});

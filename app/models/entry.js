import DS from 'ember-data';

export default DS.Model.extend({
  creationDate: DS.attr('date'),
  title: DS.attr('string'),
  memo: DS.attr('string'),
  author: DS.belongsTo('user'),
  public: DS.attr('boolean'),
  updated: DS.attr('date'),
  created: DS.attr('date')
});

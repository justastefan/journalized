import DS from 'ember-data';

export default DS.Model.extend({
  // technical
  user: DS.belongsTo(),
  entry: DS.belongsTo(),
  // user specific
  isAuthor: DS.attr('boolean'),
  tags: DS.attr('string'),
  status: DS.attr('string'),
  rating: DS.attr('number')
});

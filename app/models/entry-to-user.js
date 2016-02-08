import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo(),
  entry: DS.belongsTo(),
  accepted: DS.attr('number')
});

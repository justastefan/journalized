import DS from 'ember-data';

export default DS.Model.extend({
  // set by author
  coverImage: DS.belongsTo('image'),
  creationDate: DS.attr('date'),
  title: DS.attr('string'),
  memo: DS.attr('string'),
  location: DS.attr('string'),
  isPublic: DS.attr('boolean'),
  
  // todo: assign multipe images
  images: DS.hasMany('image'),

  // automatically set
  author: DS.belongsTo('user'),
  updated: DS.attr('date'),
  created: DS.attr('date')
});

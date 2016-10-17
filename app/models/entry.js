import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { /*belongsTo,*/ hasMany } from 'ember-data/relationships';

export default Model.extend({
  // set by author
  happened: attr('date'),
  name: attr('string'),
  content: attr('string'),

  journalEntries: hasMany('journalEntry', {
    inverse: 'entry'
  }),

  images: hasMany('image'),

  users: hasMany('user'),
  // status
  status: attr('string'),

  // automatically set
  updated: attr('date'),
  created: attr('date')
});

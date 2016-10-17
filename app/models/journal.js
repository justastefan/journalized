import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo/*, hasMany*/ } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  status: attr('string'), // public|private
  active: attr('boolean', {defaultValue: true}),

  // journalEntries: hasMany('journalEntry', {
  //   inverse: 'journal'
  // }),

  latestEntry: belongsTo('entry'), // latest entry with status = 'approved'

  // automatically set
  user: belongsTo('user'),
  updated: attr('date'),
  created: attr('date')
});

import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo/*, hasMany*/ } from 'ember-data/relationships';

export default Model.extend({
  // technical
  journal: belongsTo('journal'),
  entry: belongsTo('entry'),
  status: attr('string'),  // open, approved, rejected

  journalName: Ember.computed.alias('journal.name'),

  // automatically set
  updated: attr('date'),
  created: attr('date')
});

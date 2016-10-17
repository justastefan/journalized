import DS from 'ember-data';

import attr from 'ember-data/attr';
import { belongsTo/*, hasMany*/ } from 'ember-data/relationships';

export default DS.Model.extend({
  // technical
  journal: belongsTo('journal'),
  user: belongsTo('user'),
  status: attr('string'),  // admin|writer|reader

  // automatically set
  updated: attr('date'),
  created: attr('date')
});

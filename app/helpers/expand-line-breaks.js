import Ember from 'ember';

export function expandLineBreaks(params/*, hash*/) {
  if (Ember.typeOf(params[0]) === 'string') {
    return new Ember.Handlebars.SafeString(params[0].replace(/\n/g, '<br>'));
  }
  return '';
}

export default Ember.Helper.helper(expandLineBreaks);

import { expandLineBreaks } from '../../../helpers/expand-line-breaks';
import { module, test } from 'qunit';

module('Unit | Helper | expand line breaks');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = expandLineBreaks(['first\nsecond']);
  assert.equal('first<br>second', result);
});

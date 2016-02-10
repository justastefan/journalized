import Ember from 'ember';
import SecureRouteMixin from '../../../mixins/secure-route';
import { module, test } from 'qunit';

module('Unit | Mixin | secure route');

// Replace this with your real tests.
test('it works', function(assert) {
  let SecureRouteObject = Ember.Object.extend(SecureRouteMixin);
  let subject = SecureRouteObject.create();
  assert.ok(subject);
});

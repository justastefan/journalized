import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-entry', 'Unit | Model | user entry', {
  // Specify the other units that are required for this test.
  needs: ['model:entry','model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('edit-journal', 'Integration | Component | edit journal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{edit-journal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#edit-journal}}
      template block text
    {{/edit-journal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

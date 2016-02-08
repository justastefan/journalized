import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-entry-to-user', 'Integration | Component | list entry to user', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{list-entry-to-user}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#list-entry-to-user}}
      template block text
    {{/list-entry-to-user}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

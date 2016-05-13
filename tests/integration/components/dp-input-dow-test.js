import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dp-input-dow', 'Integration | Component | dp input dow', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dp-input-dow}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dp-input-dow}}
      template block text
    {{/dp-input-dow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

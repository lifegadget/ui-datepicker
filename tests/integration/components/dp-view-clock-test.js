import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dp-view-clock', 'Integration | Component | dp view clock', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dp-view-clock}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dp-view-clock}}
      template block text
    {{/dp-view-clock}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

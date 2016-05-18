import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dp-calendar-years', 'Integration | Component | dp calendar years', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dp-calendar-years}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dp-calendar-years}}
      template block text
    {{/dp-calendar-years}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

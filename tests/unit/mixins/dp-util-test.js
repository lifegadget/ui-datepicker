import Ember from 'ember';
import DpUtilMixin from 'ui-datepicker/mixins/dp-util';
import { module, test } from 'qunit';

module('Unit | Mixin | dp util');

// Replace this with your real tests.
test('it works', function(assert) {
  let DpUtilObject = Ember.Object.extend(DpUtilMixin);
  let subject = DpUtilObject.create();
  assert.ok(subject);
});

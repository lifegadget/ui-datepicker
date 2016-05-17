import Ember from 'ember';
import DpViewMixin from 'ui-datepicker/mixins/dp-view';
import { module, test } from 'qunit';

module('Unit | Mixin | dp view');

// Replace this with your real tests.
test('it works', function(assert) {
  let DpViewObject = Ember.Object.extend(DpViewMixin);
  let subject = DpViewObject.create();
  assert.ok(subject);
});

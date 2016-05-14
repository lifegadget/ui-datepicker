import Ember from 'ember';
import layout from '../templates/components/dp-input-control';

const inputControl = Ember.Component.extend({
  layout,
  tagName:'',

});
inputControl[Ember.NAME_KEY] = 'dp-input-control';
export default inputControl;

import Ember from 'ember';
import layout from '../templates/components/dp-composer';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line


const composer = Ember.Component.extend({
  layout,
  tagName: '',

  inputs: null,
  _inputs: computed('inputs', function() {
    const inputs = this.get('inputs');
    if (!inputs) { return []; }
    return typeOf(inputs) === 'string' ? inputs.split(',') : inputs;
  }),
  datetime: null,
  skin: '',


});
composer.reopenClass({
  positionalParams: ['datetime']
});
composer[Ember.NAME_KEY] = 'dp-composer';
export default composer;

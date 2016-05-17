import Ember from 'ember';
import layout from '../templates/components/dp-incrementer';
import ddau from '../mixins/ddau';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line


const incrementer = Ember.Component.extend(ddau,{
  layout,
  tagName:'',

  increment: 1,
  incrementUnit: 'day', // "hour, minute, day, month, year"
  target: 'start',

  direction: computed('increment', function() {
    return this.get('increment') > 0 ? 'right' : 'left';
  }),

  actions: {
    onIncrement(target, amount, unit) {
      this.ddau('onIncrement', {
        code: amount > 0 ? 'increment-datetime' : 'decrement-datetime',
        target,
        amount,
        unit
      }, amount);
    }

  }
});
incrementer.reopenClass({
  positionalParams: ['increment', 'incrementUnit']
});
incrementer[Ember.NAME_KEY] = 'dp-incrementer';
export default incrementer;

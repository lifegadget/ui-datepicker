import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/dp-calendar-years';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Component.extend({
  layout,
  tagName: '',

  validRange: computed(() => {
    return {
      start: moment('1910-01-01'),
      end: moment()
    };
  }),
  decades: computed('validRange', function() {
    const validRange = this.get('validRange');
    const start = Number(validRange.start.format('YYYY')) -  Number(validRange.start.format('YYYY').substr(-1));
    const end = Number(validRange.end.format('YYYY')) -  Number(validRange.end.format('YYYY').substr(-1));
    const decades = [];
    for (let i = start; i <= end; i = i + 10) {
      decades.push(i);
    }

    return decades;
  }),
  minDecade: computed('decades', function() {
    return this.get('decades').reduce(function (p, v) {
      return ( p < v ? p : v );
    });
  }),
  maxDecade: computed('decades', function() {
    return this.get('decades').reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }),
  markedDecades: computed('decades', function() {
    const decades = this.get('decades').slice(0);
    const {minDecade, maxDecade} = this.getProperties('minDecade', 'maxDecade');
    const marked = [];
    // pull off the edge cases
    marked.push(decades.shift());
    marked.push(decades.pop());
    // highlight
    const increment = 30;
    for (let i = minDecade + increment; i <= maxDecade; i += increment) {
      marked.push(i);
    }

    return marked;
  })

});

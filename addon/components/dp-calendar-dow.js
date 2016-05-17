import Ember from 'ember';
import layout from '../templates/components/dp-calendar-dow';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Component.extend({
  layout,
  tagName: '',
  startOfWeek: 'Mon',

  dow: [
    { name: 'Sun', type: 'weekend'},
    { name: 'Mon', type: 'weekday'},
    { name: 'Tue', type: 'weekday'},
    { name: 'Wed', type: 'weekday'},
    { name: 'Thu', type: 'weekday'},
    { name: 'Fri', type: 'weekday'},
    { name: 'Sat', type: 'weekend'},
    { name: 'Sun', type: 'weekend'},
  ],
  _dow: computed('startOfWeek', function() {
    const startOfWeek = this.get('startOfWeek');
    let dow = this.get('dow').slice(0);
    if(startOfWeek === 'Mon') {
      dow.shift();
    } else {
      dow.pop();
    }

    return dow;
  })

});

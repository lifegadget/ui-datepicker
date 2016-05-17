import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/dp-calendar-body';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

const calendarBody = Ember.Component.extend({
  layout,
  tagName: '',

  datetime: null,
  isYearRelevant: true,
  weekStartsOn: 'Mon',
  daysInMonth: computed('datetime', function() {
    return this.get('datetime').daysInMonth();
  }),
  firstDayInMonth: computed('datetime', function() {
    return moment(this.get('datetime').unix()).startOf('month').format('ddd');
  }),


});
calendarBody.reopenClass({
  positionalParams: ['datetime']
});
calendarBody[Ember.NAME_KEY] = 'calendar-body';
export default calendarBody;

import Ember from 'ember';
import moment from 'moment';
import ddau from '../mixins/ddau';
import layout from '../templates/components/dp-calendar-months';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

const calendarMonths = Ember.Component.extend(ddau,{
  layout,
  tagName: '',

  datetime: null,
  months: computed(function() {
    const months = [];
    let month = moment('1970-01-01');

    for(let i = 1; i <= 12; i++) {
      months.push(month);
      month = moment(month).add(1, 'month');
    }

    return months;
  }),
  currentMonth: computed('datetime', function() {
    return moment(this.get('datetime')).format('MMM');
  }),

  actions: {
    onChange(month) {
      const newViewPortDate = moment(this.get('datetime')).month(month.month());
      this.ddau('onChange', newViewPortDate, newViewPortDate);
    }
  }
});

calendarMonths.reopenClass({
  positionalParams: ['datetime']
});
calendarMonths[Ember.NAME_KEY] = 'calendar-months';
export default calendarMonths;

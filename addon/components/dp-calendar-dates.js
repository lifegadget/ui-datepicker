/*jshint loopfunc: true */

import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/dp-calendar-dates';
import ddau from '../mixins/ddau';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

const calendarBody = Ember.Component.extend(ddau, {
  layout,
  tagName: '',

  datetime: null,
  isYearRelevant: true,
  weekStartsOn: 'Mon',
  daysInMonth: computed('datetime', function() {
    return this.get('datetime').daysInMonth();
  }),
  holidays: [{ date: '2016-07-04', name: 'Independance Day'}],
  whitelist: [],
  blacklist: [{ date: '2016-07-08', name: 'Independance Day'}],
  firstDayInMonth: computed('datetime', function() {
    const dow = moment(this.get('datetime')).startOf('month').format('d');
    if(this.get('weekStartsOn') === 'Mon') {
      return dow === 1 ? 7 : dow - 1;
    } else {
      return dow;
    }
  }),
  dates: computed('datetime', function() {
    const {datetime, selected, daysInMonth, firstDayInMonth} = this.getProperties('datetime', 'selected', 'daysInMonth', 'firstDayInMonth');
    const days = [];
    const today = moment().format('YYYY-MM-DD');
    const selectedDate = selected.format('YYYY-MM-DD');
    // Get important dates for current, prior, and next month
    const holidays = this.get('holidays').filter(h => {
      return Math.abs(moment(h.date).format('M') - moment(datetime).format('M')) <= 1;
    });
    const whitelist = this.get('whitelist').filter(h => {
      return Math.abs(moment(h.date).format('M') - moment(datetime).format('M')) <= 1;
    });
    const blacklist = this.get('blacklist').filter(h => {
      return Math.abs(moment(h.date).format('M') - moment(datetime).format('M')) <= 1;
    });

    // current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(datetime).startOf('month').add(i - 1, 'days').format('YYYY-MM-DD');
      const holidaysOnDay = (holidays || []).filter(h => h.date === date);
      days.push({
        value: i,
        period: 'current-month',
        today: date === today,
        selected: date === selectedDate,
        holiday: holidaysOnDay.length > 0 ? holidaysOnDay : false,
        whitelisted: whitelist.filter(l => l.date === date).length > 0,
        blacklisted: blacklist.filter(l => l.date === date).length > 0,
        date: date
      });
    }
    // prior month
    for (let i = 1; i <= firstDayInMonth; i++) {
      const date = moment(datetime).startOf('month').subtract(i, 'days').format('YYYY-MM-DD');
      days.unshift({
        value: moment(datetime).startOf('month').subtract(i, 'days').format('D'),
        period: 'prior-month',
        today: date === today,
        selected: date === selectedDate,
        // holiday: holidaysOnDay.length > 0 ? holidaysOnDay : false,
        whitelisted: whitelist.filter(l => l.date === date).length > 0,
        blacklisted: blacklist.filter(l => l.date === date).length > 0,
        date: date,
      });
    }
    // following month
    for (let i = 0; days.length < 42; i++) {
      const date = moment(datetime).startOf('month').add(1, 'month').add(i, 'days').format('YYYY-MM-DD');
      days.push({
        value: moment(date).format('D'),
        period: 'following-month',
        today: date === today,
        selected: date === selectedDate,
        // holiday: holidaysOnDay.length > 0 ? holidaysOnDay : false,
        whitelisted: whitelist.filter(l => l.date === date).length > 0,
        blacklisted: blacklist.filter(l => l.date === date).length > 0,
        date: date
      });
    }

    return days;
  }),

  actions: {
    chooseDate(date) {
      const datetime = moment(this.get('datetime'));
      const newDatetime = moment(date)
                          .hours(datetime.hours())
                          .minutes(datetime.minutes())
                          .seconds(datetime.seconds());
      this.ddau('newDate', {
        code: 'date-changed',
        value: newDatetime,
        oldValue: datetime
      }, newDatetime);
    }
  }

});
calendarBody.reopenClass({
  positionalParams: ['datetime']
});
calendarBody[Ember.NAME_KEY] = 'calendar-body';
export default calendarBody;

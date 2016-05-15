import Ember from 'ember';
import layout from '../templates/components/date-picker';
import moment from 'moment';
import momentize from '../utils/momentize';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line


const datePicker = Ember.Component.extend({
  layout,
  tagName:'',

  datetime: computed.alias('start'),
  start: null,
  stop: null,
  duration: null,
  holidays: computed(() => ([])),
  whitelist: computed(() => ([])),
  blacklist: computed(() => ([])),
  size: null,
  mood: null,
  skin: 'default',

  showTime: false,
  showDay: true,
  orientation: 'horizontal',
  /**
   * Segments formatting of "start/stop" into date, time, and day formats to allow
   * for variant action/input support and to provide better CSS/meta information
   */
  dateFormat: 'DD MMM YYYY',
  timeFormat: 'LT',
  dayFormat: 'ddd, ',

  /**
   * Ensures that container's datetime is represented as moment object
   */
  _start: computed('start', function() {
    const [object, format] = momentize(this.get('start'));
    this._startFormat = format;

    return object;
  }),

  _stop: computed('stop', 'duration', function() {
    const {_start, stop, duration} = this.getProperties('_start', 'stop', 'duration');
    let object;
    let format;
    if(stop && duration) {
      this.debug('both duration and a stop time were set!');
    }

    if(duration) {
      object = moment(_start.toISOString()).add(duration);
      this._stopFormat = 'duration';
    } else {
      [object, format] = momentize(stop);
      this._stopFormat = format;
    }

    return object;
  }),

  _skin: computed('skin', function() {
    const {skin} = this.getProperties('skin');
    return skin ? ` skin-${skin}` : '';
  }),
  _mood: computed('mood', function() {
    const {mood} = this.getProperties('mood');
    return mood ? ` mood-${mood}` : '';
  }),

  standardizeFormat(input) {
    switch(typeOf(input)) {
      case 'string':
        this.dateFormat = input.indexOf('-') !== -1 ? 'string' : 'unix';
        return input.indexOf('-') !== -1 ? input : moment(input).toISOString();
      case 'object':
        this.dateFormat = 'object';
        return input.toISOString();
      case 'number':
        this.dateFormat = 'unix';
        return moment(input).toISOString();

      default:
        debug('unknown format passed in as date/time');
        return false;
    }

  }

});

datePicker.reopenClass({
  positionalParams: ['datetime']
});
datePicker[Ember.NAME_KEY] = 'date-picker';
export default datePicker;

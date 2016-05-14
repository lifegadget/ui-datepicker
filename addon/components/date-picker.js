import Ember from 'ember';
import layout from '../templates/components/date-picker';

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
  start: undefined,
  stop: undefined,
  duration: undefined,
  holidays: computed(() => ([])),
  size: undefined,
  mood: undefined,
  skin: 'default',

  showTime: false,
  orientation: 'horizontal',

  /**
   * Ensures that container's date is represented as YYYY-MM-DD
   */
  _startDate: computed('start', function() {
    const info = this.standardizeFormat(this.get('start'));
    this.set('_startFormat', info.type);

    return info.date;
  }),
  _startTime: computed('start', function() {
    const info = this.standardizeFormat(this.get('start'));

    return info.time;

  }),
  _stopDate: computed('stop', 'duration', function() {

  }),
  _stopTime: computed('stop', 'duration', function() {

  }),

  _skin: computed('skin', function() {
    const {skin} = this.getProperties('skin');
    return skin ? ` skin-${skin}` : '';
  }),
  _mood: computed('mood', function() {
    const {mood} = this.getProperties('mood');
    return mood ? ` mood-${mood}` : '';
  })

});
datePicker.reopenClass({
  positionalParams: ['datetime']
});
datePicker[Ember.NAME_KEY] = 'date-picker';
export default datePicker;

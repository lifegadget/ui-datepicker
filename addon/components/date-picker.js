import Ember from 'ember';
import layout from '../templates/components/date-picker';
import moment from 'moment';
import ddau from '../mixins/ddau';
import momentize from '../utils/momentize';
import containerFormat from '../utils/container-format';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line


const datePicker = Ember.Component.extend(ddau, {
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
  animateIn: 'fadeIn',
  animateOut: 'fadeOut',

  showTime: false,
  showDay: true,
  orientation: 'horizontal',
  /**
   * Segments formatting of "start/stop" into date, time, and day formats to allow
   * for variant action/input support and to provide better CSS/meta information
   */
  dateFormat: 'DD MMM YYYY',
  timeFormat: 'H:mm a',
  dayFormat: 'ddd',

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
  _size: computed('size', function() {
    const {size} = this.getProperties('size');
    return size ? ` size-${size}` : '';
  }),
  _mood: computed('mood', function() {
    const {mood} = this.getProperties('mood');
    return mood ? ` mood-${mood}` : '';
  }),

  /**
   * Yielded to views downstream so they can request their
   * inputs to be displayed
   */
  _requestInputFrame(show, datetime, selector, inputs) {
    const which = datetime.unix() === this.get('_start').unix() ? 'start' : 'stop';
    const notWhich = which === 'start' ? 'stop' : 'start';
    const {showStartComposer, showStopComposer} = this.getProperties('showStartComposer', 'showStopComposer');
    const showingThisComposer = which === 'start' ? showStartComposer : showStopComposer;
    const showingOtherComposer = which === 'start' ? showStopComposer : showStartComposer;

    if(show) {
      if(showingOtherComposer) { this.hideComposer(notWhich); }
      if(showingThisComposer) {
        this.hideComposer(which).then(() => {
          this.showComposer(which, selector, inputs);
        });
      } else {
        this.showComposer(which, selector, inputs);
      }
    } else {
      this.hideComposer(which);
    }
  },
  requestInputFrame: computed(function(){ return this._requestInputFrame.bind(this); }),
  showComposer(which, where, what) {
    console.log(`show ${which}`);
    this.set(`_${which}Target`, where);
    this.set('_inputs', what);
    this.set(`show${which.slice(0,1).toUpperCase()}${which.slice(1)}Composer`, true);
  },
  hideComposer(which) {
    console.log(`hide ${which}`);
    this.set(`show${which.slice(0,1).toUpperCase()}${which.slice(1)}Composer`, false);
  },

  actions: {
    onChange(target, change) {
      console.log('date-picker: change', target, change);
      change.target = target;
      this.ddau('onChange', change, change.value);
      if(target==='start') {
        this.ddau('onStartChange', change, change.value);
      } else if (target === 'stop'){
        this.ddau('onStopChange', change, change.value);
      }
    },
    onStartChange(change) {
      console.log('date-picker: start change');
      this.ddau('onChange', change, change.value);
    },
    onIncrement(i) {
      console.log('increment', i);
      const dtAttribute = `_${i.target}`;
      const value = moment(this.get(dtAttribute)).add(i.amount, i.unit);
      const {_start, _stop} = this.getProperties('_start', '_stop');
      const duration = !_stop ? null : moment(_stop).diff(_start);

      // send to general change event
      this.ddau('onChange', {
        code: i.code,
        target: i.target,
        duration,
        value: containerFormat(value, this[`${dtAttribute}Format`])
      }, containerFormat(value, this[`${dtAttribute}Format`]));

      // send specific change event (aka, start/stop)
      this.ddau(`on${Ember.String.capitalize(i.target)}Change`, {
        code: i.code,
        target: i.target,
        duration,
        value: containerFormat(value, this[`${dtAttribute}Format`])
      }, containerFormat(value, this[`${dtAttribute}Format`]));
    }
  }

});

datePicker.reopenClass({
  positionalParams: ['datetime']
});
datePicker[Ember.NAME_KEY] = 'date-picker';
export default datePicker;

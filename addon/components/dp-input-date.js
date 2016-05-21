import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/dp-input-date';
import ddau from '../mixins/ddau';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line
const dispatchEvent = function(name, target) {
  console.log('dispatching ', name);
  const event = new CustomEvent(name);
  let el = window.document.getElementsByClassName(target)[0];
  if(el) {
    el.dispatchEvent(event);
  }
};


const inputDate = Ember.Component.extend(ddau, {
  layout,
  tagName:'',

  // the official datetime
  datetime: null,
  // UI viewer's datetime
  _datetime: Ember.computed('datetime', {
    set(_, value) {
      return value;
    },
    get() {
      return this.get('datetime');
    }
  }),
  isYearRelevant: true,
  mode: null,
  animateIn: 'zoomIn',
  animateOut: 'fadeOut',
  animateInDuration: '0.35',
  animateOutDuration: '0.5',
  init() {
    this._super(...arguments);
    run.next(() => {
      this._setMode('dates');
    });
  },

  _setMode(mode) {
    const priorMode = this.get('mode');
    if (mode === priorMode) {
      mode = 'dates';
    }
    console.log(`Mode changing from ${priorMode} to ${mode}`);
    if(priorMode) {
      dispatchEvent(`hide-${priorMode}`, `dp-calendar-${priorMode}`);
    }
    if(mode) {
      dispatchEvent(`show-${mode}`, `dp-calendar-${mode}`);
    }

    this.set('mode', mode);
    console.log('set mode to: ', mode);
  },

  actions: {
    changeInputFrame(frame) {
      console.log(frame);
    },
    onChange(change) {
      this.ddau('onChange', change, change.value);
    },
    /**
     * Switch UI to view a different month
     */
    onIncrement(i) {
      const datetime = this.get('_datetime');
      const incremented = moment(datetime).add(i.amount, i.unit);

      this.set('_datetime', incremented);
    },
    /**
     * Allows the dp-calendar-xxx components to change the
     * viewing state (aka, "mode")
     */
    setMode(mode) {
      this._setMode(mode);
    },
    /**
     * When the user chooses a new month or year, this action
     * will move the viewport to the appropriate timeframe without
     * changing the selected value
     *
     * @param  {instance}   newDate   momentjs object instance
     * @return {void}                 sets the input's viewport state
     */
    changeViewTimeframe(newDate) {
      this.set('_datetime', newDate);
    }
  }

});
inputDate.reopenClass({
  positionalParams: ['datetime']
});
inputDate[Ember.NAME_KEY] = 'input-date';
export default inputDate;

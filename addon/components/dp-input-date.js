import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/dp-input-date';
import ddau from '../mixins/ddau';

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
  mode: 'days',
  animateIn: 'zoomIn',
  animateOut: 'fadeOut',
  animateInDuration: '0.5',
  animateOutDuration: '0.5',

  actions: {
    changeInputFrame(frame) {
      console.log(frame);
    },
    onChange(change) {
      console.log('dp-input-date');
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
      if (mode === this.get('mode')) {
        this.set('mode', 'days');
      } else {
        const event = new CustomEvent('body-transition-out');
        const el = window.document.getElementsByClassName('dp-calendar-body')[0];
        el.dispatchEvent(event);

        this.set('mode', mode);
      }
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
      this.set('mode', 'days');
    }
  }

});
inputDate.reopenClass({
  positionalParams: ['datetime']
});
inputDate[Ember.NAME_KEY] = 'input-date';
export default inputDate;

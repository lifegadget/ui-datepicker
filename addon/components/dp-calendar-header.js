import Ember from 'ember';
import layout from '../templates/components/dp-calendar-header';
import ddau from '../mixins/ddau';

const calendarHeading = Ember.Component.extend(ddau, {
  layout,
  tagName: '',

  datetime: null,
  isYearRelevant: true,

  actions: {
    onClick(inputType) {
      console.log(inputType);

    },
    onIncrement(i) {
      this.ddau('onIncrement', i, i);
    },
    setMode(mode) {
      this.ddau('setMode', mode, mode);
    }
  }

});
calendarHeading.reopenClass({
  positionalParams: ['datetime']
});
calendarHeading[Ember.NAME_KEY] = 'dp-calendar-heading';
export default calendarHeading;

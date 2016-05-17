import Ember from 'ember';
import layout from '../templates/components/dp-calendar-header';

const calendarHeading = Ember.Component.extend({
  layout,
  tagName: '',

  datetime: null,
  isYearRelevant: true,

  actions: {
    onClick(inputType) {
      console.log(inputType);

    }
  }

});
calendarHeading.reopenClass({
  positionalParams: ['datetime']
});
calendarHeading[Ember.NAME_KEY] = 'dp-calendar-heading';
export default calendarHeading;

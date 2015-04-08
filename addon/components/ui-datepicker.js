import Ember from 'ember';
import layout from '../templates/components/ui-datepicker';
import { moment, ago } from 'ember-moment/computed';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['ui-datepicker'],
  calendarVisibility: false,
  value: null,
  _valueInit: Ember.on('didInsertElement', function() {
    let value = this.get('value');
    let today = new Date();
    // today = moment(today);
    if(!value) {
      this.set('value', today);
    }
  }),
  
  actions: {
    toggleCalendar: function() {
      this.toggleProperty('calendarVisibility');
    }
  }
});

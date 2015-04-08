import Ember from 'ember';
import layout from '../templates/components/ui-datepicker';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['ui-datepicker'],
  calendarVisibility: false,
  value: null,
  _valueInit: Ember.on('didInsertElement', function() {
    let value = this.get('value');
    let today = new Date().seconds(0).minutes(0).hours(0);
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

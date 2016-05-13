import Ember from 'ember';
import layout from '../templates/components/ui-datepicker';
import moment from 'moment';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  classNames: ['ui-datepicker'],
  calendarVisibility: false,
  value: null,
  _valueInit: Ember.on('init', function() {
    let value = this.get('value');
    console.log('value is: %o', value);
    if(!value) {
      value = moment().startOf('day').toDate();
    } else if (moment(value,'YYYY-MM-DD').isValid()) {
      console.warn('%s: invalid date on initialization: %o', this.get('elementId'), value);
      value = moment().startOf('day').toDate();
    } else {
      // ensure no time information
      value = moment(new Date(value)).startOf('day').toDate();
    }
    this.set('value', value);
  }),
  namedDate: Ember.computed('value', function (key,value) {
    let today = moment().startOf('day');
    let namedDays = ['tomorrow','today','yesterday'];
    
    // setter
    if (arguments.length > 1) {
      if(namedDays.indexOf(String(value).toLowerCase()) !== -1) {
        let offset = namedDays.indexOf(value.toLowerCase()) - 1; // how many days ago (aka, 1 = yesterday, -1 = tomorrow)
        this.set('value', new Date( moment().startOf('day').subtract(offset,'days').format('YYYY-MM-DD') ));
      } else if (Ember.typeOf(value) === 'date') {
        this.set('value', value);
      } else {
        this.set('value', moment(value,'YYYY-MM-DD').startOf('day').toDate() );
      }
    } 
    // getter
    let selected = moment(this.get('value')).startOf('day');
    let diff = today.diff(selected,'days');
    if(Math.abs(diff) <= 1) {
      return namedDays[diff + 1];
    }
    
    return selected.format('YYYY-MM-DD');
  }),
  date: Ember.on('didInsertElement', Ember.computed('value', function (key, setter) {
    // setter 
    if (arguments.length > 1) {
      this.set('namedDate', setter);
    }
    // getter

   return moment(this.get('value')).startOf('day').format('YYYY-MM-DD');
  })),
  desc: Ember.on('didInsertElement', Ember.computed('value', function() {
    return moment(this.get('value'),'YYYY-MM-DD').calendar();
  })),
  
  actions: {
    toggleCalendar: function() {
      this.toggleProperty('calendarVisibility');
    }
  }
});

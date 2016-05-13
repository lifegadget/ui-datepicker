import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/ui-datepicker-datebar';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['date-bar'],
  when: null,
  namedDay: Ember.computed('when',function() {
    let when = moment(this.get('when'));
    let today = moment(new Date().setHours(0,0,0,0));
    if (today.format('YYYY-DD-MM') === when.format('YYYY-DD-MM')) {
      return 'TODAY';
    } else {
      return when.from(today);
    }
  }),
  
  actions: {
    toggleCalendar: function() {
      this.sendAction('toggleCalendar');
    },
    incrementDate: function() {
      let when = moment(this.get('when'));
      this.set('when', when.seconds(0).minutes(0).hours(0).add(1,'days'));
    },
    decrementDate: function() {
      let when = moment(this.get('when'));
      this.set('when', when.seconds(0).minutes(0).hours(0).subtract(1,'days'));
    }
  }
});

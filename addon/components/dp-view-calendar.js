import Ember from 'ember';
import layout from '../templates/components/dp-view-calendar';

const viewCalendar = Ember.Component.extend({
  layout,
  tagName:'',

});
viewCalendar.reopenClass({
  positionalParams: ['date']
});
viewCalendar[Ember.NAME_KEY] = 'dp-view-calendar';
export default viewCalendar;

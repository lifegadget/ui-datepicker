import Ember from 'ember';
import layout from '../templates/components/dp-input-month';

const inputMonth = Ember.Component.extend({
  layout,
  tagName:'',


});
inputMonth.reopenClass({
  positionalParams: ['date']
});
inputMonth[Ember.NAME_KEY] = 'input-month';
export default inputMonth;

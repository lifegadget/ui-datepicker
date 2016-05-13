import Ember from 'ember';
import layout from '../templates/components/dp-input-date';

const inputDate = Ember.Component.extend({
  layout,
  tagName:'',


});
inputDate.reopenClass({
  positionalParams: ['date']
});
inputDate[Ember.NAME_KEY] = 'input-date';
export default inputDate;

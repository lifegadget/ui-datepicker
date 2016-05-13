import Ember from 'ember';
import layout from '../templates/components/dp-input-dow';

const inputDate = Ember.Component.extend({
  layout,
  tagName:'',

});
inputDate.reopenClass({
  positionalParams: ['date']
});
inputDate[Ember.NAME_KEY] = 'input-dow';
export default inputDate;

import Ember from 'ember';
import layout from '../templates/components/dp-input-year';

const inputYear = Ember.Component.extend({
  layout,
  tagName:'',

});
inputYear.reopenClass({
  positionalParams: ['date']
});
inputYear[Ember.NAME_KEY] = 'input-year';
export default inputYear;

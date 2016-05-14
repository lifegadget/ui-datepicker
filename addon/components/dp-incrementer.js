import Ember from 'ember';
import layout from '../templates/components/dp-incrementer';

const incrementer = Ember.Component.extend({
  layout,
  tagName:'',

  increment: 1,
  incrementUnit: 'day', // "hour, minute, day, month, year"
});
incrementer.reopenClass({
  positionalParams: ['increment', 'incrementUnit']
});
incrementer[Ember.NAME_KEY] = 'dp-incrementer';
export default incrementer;

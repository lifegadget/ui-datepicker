import Ember from 'ember';
import layout from '../templates/components/dp-view-clock';

const viewClock = Ember.Component.extend({
  layout,
  tagName:'',

  date: undefined,
  time: undefined,

});
viewClock.reopenClass({
  positionalParams: ['time']
});
viewClock[Ember.NAME_KEY] = 'dp-view-clock';
export default viewClock;

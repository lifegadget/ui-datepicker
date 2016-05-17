import Ember from 'ember';
import layout from '../templates/components/dp-view-container';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

const viewContainer = Ember.Component.extend({
  layout,
  tagName:'',

  datetime: null,
  dateFormat: null,
  dayFormat: null,
  timeFormat: null,

});
viewContainer.reopenClass({
  positionalParams: ['datetime']
});

viewContainer[Ember.NAME_KEY] = 'dp-view-container';
export default viewContainer;

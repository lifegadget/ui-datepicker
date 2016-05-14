import Ember from 'ember';
import layout from '../templates/components/dp-view-container';

const viewContainer = Ember.Component.extend({
  layout,
  tagName:'',

});
viewContainer[Ember.NAME_KEY] = 'dp-view-calendar';
export default viewContainer;

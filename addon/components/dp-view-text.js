import Ember from 'ember';
import layout from '../templates/components/dp-view-text';

const viewText = Ember.Component.extend({
  layout,
  tagName:'',

});
viewText[Ember.NAME_KEY] = 'dp-view-text';
export default viewText;

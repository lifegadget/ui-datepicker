import Ember from 'ember';
import layout from '../templates/components/dp-divider';

const divider = Ember.Component.extend({
  layout,
  tagName:''
});

divider.reopenClass({
  positionalParams: ['content']
});
divider[Ember.NAME_KEY] = 'dp-divider';
export default divider;

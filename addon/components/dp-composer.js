import Ember from 'ember';
import layout from '../templates/components/dp-composer';

const composer = Ember.Component.extend({
  layout,
  tagName: '',

});
composer.reopenClass({
  positionalParams: ['datetime']
});
composer[Ember.NAME_KEY] = 'composer';
export default composer;

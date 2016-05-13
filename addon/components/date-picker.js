import Ember from 'ember';
import layout from '../templates/components/date-picker';

const datePicker = Ember.Component.extend({
  layout,
  tagName:'',

  datetime: undefined,

});
datePicker.reopenClass({
  positionalParams: ['datetime']
});
datePicker[Ember.NAME_KEY] = 'date-picker';
export default datePicker;

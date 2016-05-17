import Ember from 'ember';
import layout from '../templates/components/dp-input-date';

const inputDate = Ember.Component.extend({
  layout,
  tagName:'',

  datetime: null,
  isYearRelevant: true,

  actions: {
    changeInputFrame(frame) {
      console.log(frame);
    }
  }

});
inputDate.reopenClass({
  positionalParams: ['datetime']
});
inputDate[Ember.NAME_KEY] = 'input-date';
export default inputDate;

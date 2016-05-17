import Ember from 'ember';
import layout from '../templates/components/dp-view-text';
import momentize from '../utils/momentize';
import dpView from '../mixins/dp-view';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line


const viewText = Ember.Component.extend(dpView, {
  layout,
  tagName:'',

  /**
   * A representation of date, time, or both; valid values passed in are anything that
   * momentjs will accept
   * @type {[type]}
   */
  datetime: null,
  _datetime: computed('datetime', function() {
    const [object, type] = momentize(this.get('datetime'));
    this._datetimeType = type;

    return object;
  }),
  /**
   * a format string as specified by momentjs, the containing dp-view-container
   * should have filtered the format string down to just that component which
   * is relevant to this particular view
   */
  format: null,
  /**
   * An array (or CSV) of "input" components that you want the composer to bring up when
   * user wants to edit this view
   */
  inputs: '',
  _inputs: computed('inputs', function() {
    const inputs = this.get('inputs');
    switch(typeOf(inputs)) {
      case 'string':
        return inputs.split(',');
      case 'array':
        return inputs;
      default:
        debug(`"inputs" for a view should be an array or CSV, got type of "${typeOf(inputs)}"!`);
        return [];
    }
  }),

});
viewText.reopenClass({
  positionalParams: ['datetime']
});

viewText[Ember.NAME_KEY] = 'dp-view-text';
export default viewText;

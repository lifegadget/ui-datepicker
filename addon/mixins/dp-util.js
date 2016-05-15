import Ember from 'ember';
import moment from 'moment';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Mixin.create({
  /**
   * take an unknown format for representing datetime and ensure it is momentjs format
   * @param  {mixed}    input    string or object format of datetime
   * @return {object}            momentjs object
   */
  momentize(input) {
    switch(typeOf(input)) {
      case 'string':
        if(input.test(/^\d{1,2}:\d{1,2}.{0,3}$/)) {

          return moment(new Date(`1970-1-1 ${input}`));
        } else {
          return input.test(/-/) ? moment(new Date(input)) : moment.unix(input);
        }
        this.dateFormat = input.indexOf('-') !== -1 ? 'string' : 'unix';
        return input.indexOf('-') !== -1 ? input : moment(input).toISOString();
      case 'object':
        return input._isAMomentObject ? input : moment(input);
      case 'number':
        this.dateFormat = 'unix';
        return moment(input).toISOString();

      default:
        debug('unknown format passed in as date/time');
        return false;
    }

  }
});

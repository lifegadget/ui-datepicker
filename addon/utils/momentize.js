import Ember from 'ember';
import moment from 'moment';

const { keys, create } = Object; // jshint ignore:line
const { RSVP: {Promise, all, race, resolve, defer} } = Ember; // jshint ignore:line
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const { get, set, debug } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

/**
 * take an unknown format for representing datetime and ensure it is momentjs format
 * @param  {mixed}    input    string or object format of datetime
 * @return {object}            momentjs object
 */
export default function momentize(input) {
  let object;
  let format;
  switch(typeOf(input)) {
    case 'string':
      if(/^\d{1,2}:\d{1,2}.{0,3}$/.test(input)) {
        object = moment(new Date(`1970-1-1 ${input}`));
        format = 'text-time';
      } else {
        object = moment(new Date(input));
        format = /\:/.test(input) ? 'text-datetime' : 'text-date';
      }
      break;

    case 'instance':
      object = input._isAMomentObject ? input : moment(input);
      format = input._isAMomentObject ? 'moment-object' : 'date-object';
      break;

    case 'number':
      object = moment(input).toISOString();
      format = 'unix';
      break;

    default:
      debug('unknown format passed in as date/time, can\'t convert to moment object');
      object = false;
      format = `unknown ${typeOf(input)}`;
  }

  return [object, format];
}

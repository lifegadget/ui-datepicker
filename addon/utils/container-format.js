import Ember from 'ember';

/**
 * Given a momentjs datetime, it will convert back to a given format
 * @param  {instance}   value   a momentjs instance
 * @param  {string}     format  the format string set by the "mementize" function
 * @return {mixed}              returns newly formatted date/time representation
 */
export default function containerFormat(value, format) {
  switch(format) {
    case 'moment-object':
      return value;
    case 'text-datetime':
      return value.toISOString();
    case 'text-date':
      return value.format('YYYY-MM-DD');
    case 'unix':
      return value.unix();

    default:
      Ember.debug(`container-format: unknown container format (${format}), passing back "as-is" ... value is: `, value);
      return value;
  }
}

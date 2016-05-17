import Ember from 'ember';

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
      Ember.debug('unknown container format, passing back as momentjs object instance:', format);
      return value;
  }
}

import Ember from 'ember';

export function dpInverse(params/*, hash*/) {
  return params[0] * -1;
}

export default Ember.Helper.helper(dpInverse);

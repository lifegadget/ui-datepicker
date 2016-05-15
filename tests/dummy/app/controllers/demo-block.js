import Ember from 'ember';
const { inject: {service} } = Ember; // jshint ignore:line
const { computed, observe, $, run, on, typeOf } = Ember;  // jshint ignore:line
const a = Ember.A; // jshint ignore:line


export default Ember.Controller.extend({
  navigator: service(),
  whichDemo: computed('navigator.currentNode', function() {
    const {isIndexRoute, currentNode} = this.get('navigator').getProperties('isIndexRoute', 'currentNode');
    if (isIndexRoute) { return null; }
    else {
      return currentNode.substr(-1);
    }
  }),
  actions: {
    chooseDemo(hash) {
      this.transitionToRoute(`demo-block.example${hash.value}`);
    }
  }
});

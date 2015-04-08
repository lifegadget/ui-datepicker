import Ember from 'ember';

export default Ember.Controller.extend({

  device: null,
  
  actions: {
    chooseDevice: function() {
      console.log('button pressed');
    }
  }

});
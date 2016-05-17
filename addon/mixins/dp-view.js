import Ember from 'ember';

export default Ember.Mixin.create({
  _showInputs: false,

  actions: {
    toggleInputs() {
      const showInputs = this.get('_showInputs');
      this.set('_showInputs', !showInputs);
      this.requestInputFrame(!showInputs, this.get('datetime'), `#${this.elementId}`, this.get('inputs'));
    }
  }
});

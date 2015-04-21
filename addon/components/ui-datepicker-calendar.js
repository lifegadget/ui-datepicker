import Ember from 'ember';
import layout from '../templates/components/ui-datepicker-calendar';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['calendar-bar'],
  todayHightlight: true,
  visibility: false,
  _visibility: Ember.observer('visibility', function() {
    let visibility = this.get('visibility');
    if(visibility) {
      this.applyEffect('revealDown');
    } else {
      this.applyEffect('concealUp', item => {
        item.addClass('hidden');
      });
    }
  }),
  when: null,
  _whenOberserver: Ember.observer('when', function() {
    this.set('visibility', false);
  }),
  
  applyEffect: function(effect, cb=null) {
    this.$().addClass('animated ' + effect);
    this.$().removeClass('hidden');
    this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
      this.$().removeClass('animated ' + effect);
      if(cb) {
        cb(this.$());
      }
    });
  },
  
});

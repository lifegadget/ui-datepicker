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
      this.$().removeClass('hidden');
      this.applyEffect('revealDown').then( ()=> {
        console.log('displayed now');
      });
    } else {
      this.applyEffect('concealUp').then( (item)=> {
        console.log('hidden now');
        item.addClass('hidden');
      });
    }
  }),
  when: null,
  _whenOberserver: Ember.observer('when', function() {
    let when = this.get('when');
    this.set('visibility', false);
  }),
  
  
  applyEffect: function(effect) {
    this.$().addClass('animated ' + effect);
    let promise = new Promise( (resolve)=> {
      this.$().removeClass('hidden');
      this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        this.$().removeClass('animated ' + effect);
        resolve(this.$());
      });
    });
    
    return promise;
  },
  
});

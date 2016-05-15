import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('demo-inline');
  this.route('demo-block', function() {
    this.route('example1');
    this.route('example2');
    this.route('example3');
  });
});

export default Router;

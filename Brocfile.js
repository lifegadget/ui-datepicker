/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();
// specific to this addon
app.import('vendor/ui-datepicker/ui-datepicker.css');
// Bootstrap
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/js/button.js');
// animate.css
app.import('bower_components/animate.css/source/_base.css');
app.import('bower_components/animate.css/source/sliding_entrances/slideInUp.css');
app.import('bower_components/animate.css/source/sliding_entrances/slideInDown.css');
app.import('bower_components/animate.css/source/sliding_exits/slideOutUp.css');
app.import('bower_components/animate.css/source/sliding_exits/slideOutDown.css');


module.exports = app.toTree();

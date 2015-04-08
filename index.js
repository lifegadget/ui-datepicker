/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-datepicker',
	description: 'Ember flare for FontAwesome love',
	included: function(app) {
		this._super.included(app);
    // specific to this addon
    app.import('vendor/ui-datepicker/ui-datepicker.css');
    // animate.css
    app.import('bower_components/animate.css/source/_base.css');
    app.import('bower_components/animate.css/source/sliding_entrances/slideInUp.css');
    app.import('bower_components/animate.css/source/sliding_entrances/slideInDown.css');
    app.import('bower_components/animate.css/source/sliding_exits/slideOutUp.css');
    app.import('bower_components/animate.css/source/sliding_exits/slideOutDown.css');
  }
};

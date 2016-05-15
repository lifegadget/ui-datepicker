/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-datepicker',
  included: function(app) {
		this._super.included(app);
    app.import('vendor/ui-datepicker/ui-datepicker.css');
    app.import('vendor/ui-datepicker/skins/default.css');
	}
};

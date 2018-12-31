System.register(['./chunk-dbf50643.js'], function (exports, module) {
	'use strict';
	var href;
	return {
		setters: [function (module) {
			href = module.href;
		}],
		execute: function () {

			self.postMessage(Math.random());

			console.log(href);

		}
	};
});

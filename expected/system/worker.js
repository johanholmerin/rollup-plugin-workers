System.register(['./chunk-fbc9a9e9.js'], function (exports, module) {
	'use strict';
	var href;
	return {
		setters: [function (module) {
			href = module.a;
		}],
		execute: function () {

			self.postMessage(Math.random());

			console.log(href);

		}
	};
});

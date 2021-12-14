System.register(['./shared-8a23bb95.js'], (function () {
	'use strict';
	var href;
	return {
		setters: [function (module) {
			href = module.href;
		}],
		execute: (function () {

			self.postMessage(Math.random());

			console.log(href);

		})
	};
}));

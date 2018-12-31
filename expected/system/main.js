System.register(['./chunk-dbf50643.js'], function (exports, module) {
  'use strict';
  var href;
  return {
    setters: [function (module) {
      href = module.href;
    }],
    execute: function () {

      const w = new Worker("/system/chunk-6109319c.js', { name: 'myWorker' });

      w.addEventListener('message', event => {
        console.log('from worker', event.data);
      });

      console.log(href);

      const n = exports('n', 0);

      setTimeout(() => {
        module.import('./chunk-dbf50643.js');
      });

    }
  };
});

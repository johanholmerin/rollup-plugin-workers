System.register(['./chunk-fbc9a9e9.js'], function (exports, module) {
  'use strict';
  var href;
  return {
    setters: [function (module) {
      href = module.a;
    }],
    execute: function () {

      const w = new Worker("/system/worker.js", { name: 'myWorker' });

      w.addEventListener('message', event => {
        console.log('from worker', event.data);
      });

      console.log(href);

      const n = exports('n', 0);

      setTimeout(() => {
        module.import("./chunk-fbc9a9e9.js");
      });

    }
  };
});

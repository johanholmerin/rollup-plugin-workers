System.register(['./chunks/shared-eac19bc2.js'], function (exports, module) {
  'use strict';
  var href;
  return {
    setters: [function (module) {
      href = module.href;
    }],
    execute: function () {

      const w = new Worker(new URL('chunks/worker-d87d1ce4.js', module.meta.url).href, { type: undefined, name: 'myWorker' });

      navigator.serviceWorker.register(new URL('chunks/sw-a5160973.js', module.meta.url).href, { type: undefined });

      CSS.paintWorklet.addModule(new URL('chunks/paint-worklet-d670aca5.js', module.meta.url).href);

      w.addEventListener('message', event => {
        console.log('from worker', event.data);
      });

      console.log(href);

      const n = exports('n', 0);

      setTimeout(() => {
        module.import('./chunks/shared-eac19bc2.js');
      });

    }
  };
});

System.register(['./chunks/shared-8a23bb95.js'], (function (exports, module) {
  'use strict';
  var href;
  return {
    setters: [function (module) {
      href = module.href;
    }],
    execute: (function () {

      const w = new Worker(new URL('chunks/worker-02d5b63e.js', module.meta.url).href, { type: undefined, name: 'myWorker' });

      navigator.serviceWorker.register(new URL('chunks/sw-64fd194e.js', module.meta.url).href, { type: undefined });

      CSS.paintWorklet.addModule(new URL('chunks/paint-worklet-736276e5.js', module.meta.url).href);

      w.addEventListener('message', event => {
        console.log('from worker', event.data);
      });

      console.log(href);

      const n = exports('n', 0);

      setTimeout(() => {
        module.import('./chunks/shared-8a23bb95.js');
      });

    })
  };
}));

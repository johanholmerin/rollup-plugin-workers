define(['require', 'exports', './chunks/shared-e68f0d0a'], (function (require, exports, shared) { 'use strict';

  const w = new Worker(new URL(require.toUrl('./chunks/worker-677ca0aa.js'), document.baseURI).href, { type: undefined, name: 'myWorker' });

  navigator.serviceWorker.register(new URL(require.toUrl('./chunks/sw-207d8bbb.js'), document.baseURI).href, { type: undefined });

  CSS.paintWorklet.addModule(new URL(require.toUrl('./chunks/paint-worklet-fbab2261.js'), document.baseURI).href);

  w.addEventListener('message', event => {
    console.log('from worker', event.data);
  });

  console.log(shared.href);

  const n = 0;

  setTimeout(() => {
    new Promise(function (resolve, reject) { require(['./chunks/shared-e68f0d0a'], resolve, reject); });
  });

  exports.n = n;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

define(['require', 'exports', './chunks/shared-f72691bb'], function (require, exports, shared) { 'use strict';

  const w = new Worker(new URL(require.toUrl('chunks/worker-2b1ac478.js'), document.baseURI).href, { type: undefined, name: 'myWorker' });

  navigator.serviceWorker.register(new URL(require.toUrl('chunks/sw-5fc9e15d.js'), document.baseURI).href, { type: undefined });

  CSS.paintWorklet.addModule(new URL(require.toUrl('chunks/paint-worklet-236c4cae.js'), document.baseURI).href);

  w.addEventListener('message', event => {
    console.log('from worker', event.data);
  });

  console.log(shared.href);

  const n = 0;

  setTimeout(() => {
    new Promise(function (resolve, reject) { require(['./chunks/shared-f72691bb'], resolve, reject) });
  });

  exports.n = n;

  Object.defineProperty(exports, '__esModule', { value: true });

});

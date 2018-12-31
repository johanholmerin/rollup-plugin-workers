define(['require', 'exports', './chunk-97e6029f.js'], function (require, exports, shared_js) { 'use strict';

  const w = new Worker("/amd/chunk-777df728.js', { name: 'myWorker' });

  w.addEventListener('message', event => {
    console.log('from worker', event.data);
  });

  console.log(shared_js.href);

  const n = 0;

  setTimeout(() => {
    new Promise(function (resolve, reject) { require(['./chunk-97e6029f.js'], resolve, reject) });
  });

  exports.n = n;

  Object.defineProperty(exports, '__esModule', { value: true });

});

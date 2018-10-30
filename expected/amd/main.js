define(['require', 'exports', './chunk-b0d72e8b.js'], function (require, exports, __chunk_1) { 'use strict';

  const w = new Worker("/amd/worker.js", { name: 'myWorker' });

  w.addEventListener('message', event => {
    console.log('from worker', event.data);
  });

  console.log(__chunk_1.href);

  const n = 0;

  setTimeout(() => {
    new Promise(function (resolve, reject) { require(["./chunk-b0d72e8b.js"], resolve, reject) });
  });

  exports.n = n;

  Object.defineProperty(exports, '__esModule', { value: true });

});

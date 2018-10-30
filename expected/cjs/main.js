'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-1380c7de.js');

const w = new Worker("/cjs/worker.js", { name: 'myWorker' });

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(__chunk_1.href);

const n = 0;

setTimeout(() => {
  Promise.resolve(require("./chunk-1380c7de.js"));
});

exports.n = n;

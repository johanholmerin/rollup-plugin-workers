'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared_js = require('./chunk-7bc14406.js');

const w = new Worker("/cjs/chunk-e3f83b8f.js', { name: 'myWorker' });

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(shared_js.href);

const n = 0;

setTimeout(() => {
  Promise.resolve(require('./chunk-7bc14406.js'));
});

exports.n = n;

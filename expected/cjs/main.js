'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('./chunks/shared-02d44c3a.js');

const w = new Worker((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/chunks/worker-657fc06a.js').href : new URL('chunks/worker-657fc06a.js', document.currentScript && document.currentScript.src || document.baseURI).href), { type: undefined, name: 'myWorker' });

navigator.serviceWorker.register((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/chunks/sw-76f82b99.js').href : new URL('chunks/sw-76f82b99.js', document.currentScript && document.currentScript.src || document.baseURI).href), { type: undefined });

CSS.paintWorklet.addModule((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/chunks/paint-worklet-f3cf0f59.js').href : new URL('chunks/paint-worklet-f3cf0f59.js', document.currentScript && document.currentScript.src || document.baseURI).href));

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(shared.href);

const n = 0;

setTimeout(() => {
  new Promise(function (resolve) { resolve(require('./chunks/shared-02d44c3a.js')); });
});

exports.n = n;

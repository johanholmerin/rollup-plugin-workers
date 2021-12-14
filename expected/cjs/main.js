'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('./chunks/shared-9c393e62.js');

const w = new Worker((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/chunks/worker-d8ba0ac5.js').href : new URL('chunks/worker-d8ba0ac5.js', document.currentScript && document.currentScript.src || document.baseURI).href), { type: undefined, name: 'myWorker' });

navigator.serviceWorker.register((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/chunks/sw-4b5d901f.js').href : new URL('chunks/sw-4b5d901f.js', document.currentScript && document.currentScript.src || document.baseURI).href), { type: undefined });

CSS.paintWorklet.addModule((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/chunks/paint-worklet-a5ce7a84.js').href : new URL('chunks/paint-worklet-a5ce7a84.js', document.currentScript && document.currentScript.src || document.baseURI).href));

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(shared.href);

const n = 0;

setTimeout(() => {
  Promise.resolve().then(function () { return require('./chunks/shared-9c393e62.js'); });
});

exports.n = n;

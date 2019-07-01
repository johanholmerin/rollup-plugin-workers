import { href } from './chunks/shared-4b7e6060.js';

const w = new Worker(new URL('chunks/worker-e6814777.js', import.meta.url).href, { type: 'module', name: 'myWorker' });

navigator.serviceWorker.register(new URL('chunks/sw-7cb0014c.js', import.meta.url).href, { type: 'module' });

CSS.paintWorklet.addModule(new URL('chunks/paint-worklet-f88ac311.js', import.meta.url).href);

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(href);

const n = 0;

setTimeout(() => {
  import('./chunks/shared-4b7e6060.js');
});

export { n };

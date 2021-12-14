import { href } from './chunks/shared-4628a848.js';

const w = new Worker(new URL('chunks/worker-7aa04bd1.js', import.meta.url).href, { type: 'module', name: 'myWorker' });

navigator.serviceWorker.register(new URL('chunks/sw-eb85c480.js', import.meta.url).href, { type: 'module' });

CSS.paintWorklet.addModule(new URL('chunks/paint-worklet-e691e57b.js', import.meta.url).href);

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(href);

const n = 0;

setTimeout(() => {
  import('./chunks/shared-4628a848.js');
});

export { n };

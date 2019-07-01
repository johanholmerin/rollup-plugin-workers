import { href } from './shared.js';

const w = new Worker('./worker.js', { type: 'module', name: 'myWorker' });

navigator.serviceWorker.register('./sw.js', { type: 'module' });

CSS.paintWorklet.addModule('./paint-worklet.js');

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(href);

export const n = 0;

setTimeout(() => {
  import('./shared.js');
});

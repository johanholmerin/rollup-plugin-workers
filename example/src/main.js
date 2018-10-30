import { href } from './shared.js';

const w = new Worker('./worker.js', { type: 'module' });

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(href, import.meta.url);

export const n = 0;

setTimeout(() => {
  import('./shared.js');
});

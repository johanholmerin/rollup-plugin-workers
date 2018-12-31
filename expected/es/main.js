import { href } from './chunk-9f5ddea3.js';

const w = new Worker("/es/chunk-dce07e0f.js', { type: "module", name: 'myWorker' });

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(href);

const n = 0;

setTimeout(() => {
  import('./chunk-9f5ddea3.js');
});

export { n };

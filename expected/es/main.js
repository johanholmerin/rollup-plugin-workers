import { a as href } from './chunk-1d87b096.js';

const w = new Worker("/es/worker.js", { type: "module", name: 'myWorker' });

w.addEventListener('message', event => {
  console.log('from worker', event.data);
});

console.log(href);

const n = 0;

setTimeout(() => {
  import("./chunk-1d87b096.js");
});

export { n };

import worker from 'rollup-plugin-worker';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default [{
  input: 'src/system.js',
  output: {
    file: 'dist/system/system.js',
    format: 'iife'
  },
  plugins: [
    replace({
      TRACING: false
    }),
    resolve()
  ]
}, {
  input: 'src/main.js',
  output: {
    dir: 'dist/system',
    format: 'system',
    // Add loader to Workers
    banner: 'self.importScripts && !self.System && importScripts("system.js");'
  },
  plugins: [
    worker()
  ]
}];

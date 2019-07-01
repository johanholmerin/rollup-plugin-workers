import worker from 'rollup-plugin-worker';

export default [{
  input: 'src/main.js',
  output: {
    dir: 'dist/es',
    format: 'es'
  },
  plugins: [
    worker()
  ]
}];

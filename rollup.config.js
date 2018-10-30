const worker = require('./index.js');

const defaultConfig = {
  input: 'test/main.js',
  experimentalCodeSplitting: true
};

const FORMATS = ['es', 'system', 'amd', 'cjs'];

module.exports = FORMATS.map(format => ({
  ...defaultConfig,
  output: {
    dir: `expected/${format}`,
    format
  },
  plugins: [worker({ publicPath: '/' + format })]
}));

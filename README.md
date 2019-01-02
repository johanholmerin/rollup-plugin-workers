# rollup-plugin-worker

Adds code splitting for module Workers to Rollup. Works with `es`, `system`,
`amd`, and `cjs` formats.

## Notes

* Does not include any module loader. See [example](example)
* All Worker URLs will be absolute. See `publicPath` option

## Installation

```sh
yarn add -D git+https://github.com/johanholmerin/rollup-plugin-worker#semver:^1.2.0
```

## Usage

**rollup.config.js**

```javascript
import worker from 'rollup-plugin-worker';

export default {
  input: 'main.js',
  output: {
    dir: 'dist/system',
    format: 'system'
  },
  plugins: [
    worker({
      publicPath: '/system'
    })
  ],
  // Only need for Rollup < 1.0
  experimentalCodeSplitting: true
};
```

**main.js**

```javascript
// if format isn't `es`, `type` will be removed
const worker = new Worker('worker.js', { type: 'module' });
```

## Options

- `publicPath`: Absolute path where files will be served from. Defaults to `/`
- `constructors`: List of constructors to replace. Defaults to `['Worker']`

const assert = require('assert');

const { modify, addReplacement } = require('./shared.js');
const formats = require('./renderChunk.js');

/**
 * Converts Worker contructors to dynamic imports in transform for Rollup to
 * bundle, and then converts them back in renderChunk
 */
module.exports = function worker({
  publicPath = '',
  constructors = ['Worker']
} = {}) {
  return {
    name: 'worker',
    options(options) {
      assert(!options.inlineDynamicImports, 'inlineDynamicImports must be false');
      assert(
        // Rollup 1.0 has code splitting enabled by default
        options.experimentalCodeSplitting ||
          !('experimentalCodeSplitting' in options),
        'experimentalCodeSplitting must be true'
      );
    },
    // Replace `new Worker(..., { type: 'module' }) with `/*! worker-x */import(...)`
    transform(code) {
      return modify.call(this, code, ({ node, ms }) => {
        if (node.type !== 'NewExpression') return;
        if (!constructors.includes(node.callee.name)) return;

        const [url, options] = node.arguments;
        if (!url || url.type !== 'Literal') return;
        if (url.value.startsWith('data:')) return;

        if (!options || options.type !== 'ObjectExpression') return;
        const type = options.properties.find(prop => {
          return (
            prop.kind === 'init' &&
            (prop.key.name === 'type' || prop.key.value === 'type')
          );
        });

        if (!type) return;
        if (type.value.value !== 'module') return;

        const prefix = addReplacement({
          name: node.callee.name,
          // Options without type
          options:
            options.properties.length > 1
              ? ms.slice(options.properties[1].start, options.end - 1).trim()
              : ''
        });

        ms.overwrite(node.start, url.start, `${prefix}import(`);
        // Remove options
        ms.remove(url.end, node.end - 1);
      });
    },
    renderChunk(code, _, { format }) {
      assert(format in formats, `format ${format} not supported`);

      return modify.call(this, code, arg => formats[format](arg, publicPath));
    }
  };
};

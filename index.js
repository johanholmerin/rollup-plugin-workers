const Traveler = require('traveler');
const MagicString = require('magic-string');
const { createFilter } = require('rollup-pluginutils');

const CONSTRUCTORS = ['Worker', 'SharedWorker'];

function findType(properties) {
  return properties.find(prop => {
    return (
      prop.kind === 'init' &&
      (prop.key.name === 'type' || prop.key.value === 'type')
    );
  });
}

function isModule(options) {
  if (!options || options.type !== 'ObjectExpression') return false;

  const type = findType(options.properties);
  if (!type) return false;
  if (type.value.value !== 'module') return false;

  return true;
}

function isString(node) {
  return node && node.type === 'Literal' && typeof node.value === 'string';
}

function findWorker(node) {
  if (node.type !== 'NewExpression') return;
  if (!CONSTRUCTORS.includes(node.callee.name)) return;

  const [, options] = node.arguments;
  if (!isModule(options)) return;

  return node;
}

function findServiceWorker(node) {
  if (node.type !== 'ExpressionStatement') return;

  const { expression } = node;
  if (expression.type !== 'CallExpression') return;

  const { callee } = expression;
  if (callee.type !== 'MemberExpression') return;
  if (callee.object.type !== 'MemberExpression') return;
  if (callee.object.object.name !== 'navigator') return;
  if (callee.object.property.name !== 'serviceWorker') return;
  if (callee.property.name !== 'register') return;

  const [, options] = expression.arguments;
  if (!isModule(options)) return;

  return expression;
}

function findWorklet(node) {
  if (node.type !== 'ExpressionStatement') return;

  const { expression } = node;
  if (expression.type !== 'CallExpression') return;

  const { callee } = expression;
  if (callee.type !== 'MemberExpression') return;
  if (callee.object.type !== 'MemberExpression') return;
  if (!callee.object.property.name.match(/^[a-z]+Worklet$/)) return;
  if (callee.property.name !== 'addModule') return;

  return expression;
}

module.exports = function worker({ include, exclude } = {}) {
  const filter = createFilter(include, exclude);

  return {
    name: 'worker',
    async transform(code, id) {
      if (!filter(id)) return;

      const ast = this.parse(code);
      const ms = new MagicString(code);

      const traveler = new Traveler(ast);
      for (const node of traveler) {
        const call =
          findWorker(node) || findServiceWorker(node) || findWorklet(node);
        if (!call) continue;

        const [url] = call.arguments;
        if (!isString(url)) continue;

        const { id: path, external } = await this.resolve(url.value, id);
        if (external) continue;
        const chunkRef = this.emitChunk(path);

        ms.overwrite(
          url.start,
          url.end,
          `import.meta.ROLLUP_CHUNK_URL_${chunkRef}`
        );
      }

      return {
        code: ms.toString(),
        map: ms.generateMap()
      };
    },
    renderChunk(code, _, { format }) {
      // Remove type: 'module' when not using modules output format
      if (format === 'es') return;

      const ast = this.parse(code);
      const ms = new MagicString(code);

      const traveler = new Traveler(ast);
      for (const node of traveler) {
        const call = findWorker(node) || findServiceWorker(node);
        if (!call) continue;

        const [, options] = call.arguments;
        const type = findType(options.properties);

        if (!type) continue;
        if (type.value.value !== 'module') continue;

        ms.overwrite(type.value.start, type.value.end, 'undefined');
      }

      return {
        code: ms.toString(),
        map: ms.generateMap()
      };
    }
  };
};

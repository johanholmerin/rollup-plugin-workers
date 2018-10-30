const { isPrefixed, replaceImport } = require('./shared.js');

/**
 * Definitions for dynamic import code:
 * https://github.com/rollup/rollup/blob/master/src/ast/nodes/Import.ts
 */

function es({ code, ms, node }, publicPath) {
  if (node.type !== 'CallExpression') return;
  if (node.callee.type !== 'Import') return;
  if (!isPrefixed(code, node.start)) return;

  const [url] = node.arguments;

  replaceImport({ ms, node, url, code, publicPath, module: true });
}

function system({ code, ms, node }, publicPath) {
  if (node.type !== 'CallExpression') return;
  if (!isPrefixed(code, node.start)) return;
  if (code.slice(node.callee.start, node.callee.end) !== 'module.import') {
    return;
  }

  const [url] = node.arguments;
  replaceImport({ ms, node, url, code, publicPath });
}

function cjs({ code, ms, node }, publicPath) {
  if (node.type !== 'CallExpression') return;
  if (node.callee.type !== 'MemberExpression') return;
  if (!isPrefixed(code, node.start)) return;
  if (code.slice(node.callee.start, node.callee.end) !== 'Promise.resolve') {
    return;
  }

  const req =
    node.arguments[0].type === 'ObjectExpression'
      ? node.arguments[0].properties[0].value // interop
      : node.arguments[0];

  const [url] = req.arguments;
  replaceImport({ ms, node, url, code, publicPath });
}

function amd({ code, ms, node }, publicPath) {
  if (node.type !== 'NewExpression') return;
  if (node.callee.name !== 'Promise') return;
  if (!isPrefixed(code, node.start)) return;

  const [func] = node.arguments;
  if (!func || func.type !== 'FunctionExpression') return;

  const [url] = func.body.body[0].expression.arguments[0].elements;
  replaceImport({ ms, node, url, code, publicPath });
}

module.exports = { es, system, cjs, amd };

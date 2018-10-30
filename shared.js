const { walk } = require('estree-walker');
const MagicString = require('magic-string');

const PREFIX_START = '/*! worker-';
const PREFIX_END = ' */';
const PREFIX_REGEX = /\/\*\! worker-([0-9]+) \*\/$/;

const REPLACEMENTS = [];

function modify(code, cb) {
  const ast = this.parse(code);
  const ms = new MagicString(code);

  walk(ast, {
    enter(node) {
      cb({ code, ms, node });
    }
  });

  return {
    code: ms.toString(),
    map: ms.generateMap()
  };
}

function isPrefixed(code, position) {
  return !!getPrefixId(code, position);
}

function getPrefixId(code, position) {
  const match = code.slice(0, position).match(PREFIX_REGEX);
  return match && match[1];
}

function replaceImport({ ms, node, url, code, publicPath, module = false }) {
  const id = getPrefixId(code, node.start);
  const prefixLength = PREFIX_START.length + PREFIX_END.length + id.length;
  const { name, options } = REPLACEMENTS[id];

  // Remove everything until close parenthesis
  ms.remove(url.end, node.end - 1);

  ms.overwrite(
    node.start - prefixLength,
    url.start + 2,
    `new ${name}("${publicPath}`
  );

  if (module) {
    ms.appendRight(url.end, `, { type: "module", ${options} }`);
  } else if (options) {
    ms.appendRight(url.end, `, { ${options} }`);
  }
}

function addReplacement(replacement) {
  const id = REPLACEMENTS.push(replacement) - 1;
  return `${PREFIX_START}${id}${PREFIX_END}`;
}

module.exports = { modify, isPrefixed, replaceImport, addReplacement };

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compareImports = require('./compareImports');

var _compareImports2 = _interopRequireDefault(_compareImports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (file, api, options) => {
  const config = options && options instanceof Object && options.sortConfig || {};

  const j = api.jscodeshift;
  const root = j(file.source);

  const declarations = root.find(j.ImportDeclaration);

  if (declarations.length <= 1) {
    return root.toSource();
  }

  const sortedDeclarations = declarations.nodes().sort((a, b) => (0, _compareImports2.default)(b.source.value, a.source.value, config.groups));

  declarations.remove();

  const body = root.get().value.program.body;
  sortedDeclarations.forEach(dec => body.unshift(dec));

  return root.toSource();
};
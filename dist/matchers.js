'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLocalModuleFromSiblingDirectory = exports.isLocalModuleCurrentDirectoryIndex = exports.isLocalModuleFromParentDirectory = exports.isInternalModule = exports.isScopedExternalModule = exports.isExternalModule = undefined;

var _isBuiltinModule = require('is-builtin-module');

var _isBuiltinModule2 = _interopRequireDefault(_isBuiltinModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CURRENT_DIRECTORY_PREFIX = './';
const PARENT_DIRECTORY_PREFIX = '../';

const isExternalModule = exports.isExternalModule = path => {
  return (/^[\w-]+$/.test(path) && !(0, _isBuiltinModule2.default)(path)
  );
};

// 1. start with @
// 2. see if it's a word or '-' (one or more times)
// 3. see if it optionally ends with a '/'
// 4. Recursively check again
const isScopedExternalModule = exports.isScopedExternalModule = path => /^@(?:[\w-]+\/?[\w-])+$/.test(path) && !(0, _isBuiltinModule2.default)(path);

const isInternalModule = exports.isInternalModule = path => /^[\w-]+(\/[\w-]+)+$/.test(path);

const isLocalModuleFromParentDirectory = exports.isLocalModuleFromParentDirectory = path => path.startsWith(PARENT_DIRECTORY_PREFIX);

const isLocalModuleCurrentDirectoryIndex = exports.isLocalModuleCurrentDirectoryIndex = path => path === CURRENT_DIRECTORY_PREFIX;

const isLocalModuleFromSiblingDirectory = exports.isLocalModuleFromSiblingDirectory = path => !isLocalModuleCurrentDirectoryIndex(path) && path.startsWith(CURRENT_DIRECTORY_PREFIX);
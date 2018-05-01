'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _matchers = require('./matchers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BUILTIN_MODULE_A = 'fs';
const BUILTIN_MODULE_B = 'http';
const EXTERNAL_MODULE_A = 'alpha-module';
const EXTERNAL_MODULE_B = 'beta-module';
const EXTERNAL_SCOPED_MODULE = '@omega';
const VALID_EXTERNAL_SCOPED_MODULE_WITH_SLASH = '@foo/abc';
const INVALID_EXTERNAL_SCOPED_MODULE_WITH_SLASHES = '@foo/////abc';
const INTERNAL_MODULE_A = 'src/foo';
const INTERNAL_MODULE_B = 'src/foo/bar/baz';
const LOCAL_PARENT_MODULE_A = '../delta';
const LOCAL_PARENT_MODULE_B = '../gamma';
const LOCAL_INDEX_MODULE = './';
const LOCAL_SIBLING_MODULE_A = './epsilon';
const LOCAL_SIBLING_MODULE_B = './zeta/eta';

(0, _ava2.default)('isExternalModule is true only for external modules', t => {
  t.false((0, _matchers.isExternalModule)(BUILTIN_MODULE_A));
  t.false((0, _matchers.isExternalModule)(BUILTIN_MODULE_B));
  t.false((0, _matchers.isExternalModule)(EXTERNAL_SCOPED_MODULE));
  t.false((0, _matchers.isExternalModule)(INTERNAL_MODULE_A));
  t.false((0, _matchers.isExternalModule)(INTERNAL_MODULE_B));
  t.false((0, _matchers.isExternalModule)(INVALID_EXTERNAL_SCOPED_MODULE_WITH_SLASHES));
  t.false((0, _matchers.isExternalModule)(LOCAL_INDEX_MODULE));
  t.false((0, _matchers.isExternalModule)(LOCAL_PARENT_MODULE_A));
  t.false((0, _matchers.isExternalModule)(LOCAL_PARENT_MODULE_B));
  t.false((0, _matchers.isExternalModule)(LOCAL_SIBLING_MODULE_A));
  t.false((0, _matchers.isExternalModule)(LOCAL_SIBLING_MODULE_B));
  t.false((0, _matchers.isExternalModule)(VALID_EXTERNAL_SCOPED_MODULE_WITH_SLASH));
  t.true((0, _matchers.isExternalModule)(EXTERNAL_MODULE_A));
  t.true((0, _matchers.isExternalModule)(EXTERNAL_MODULE_B));
});

(0, _ava2.default)('isInternalModule is true only for internal modules', t => {
  t.false((0, _matchers.isInternalModule)(BUILTIN_MODULE_A));
  t.false((0, _matchers.isInternalModule)(BUILTIN_MODULE_B));
  t.false((0, _matchers.isInternalModule)(EXTERNAL_MODULE_A));
  t.false((0, _matchers.isInternalModule)(EXTERNAL_MODULE_B));
  t.false((0, _matchers.isInternalModule)(EXTERNAL_SCOPED_MODULE));
  t.false((0, _matchers.isInternalModule)(INVALID_EXTERNAL_SCOPED_MODULE_WITH_SLASHES));
  t.false((0, _matchers.isInternalModule)(LOCAL_INDEX_MODULE));
  t.false((0, _matchers.isInternalModule)(LOCAL_PARENT_MODULE_A));
  t.false((0, _matchers.isInternalModule)(LOCAL_PARENT_MODULE_B));
  t.false((0, _matchers.isInternalModule)(LOCAL_SIBLING_MODULE_A));
  t.false((0, _matchers.isInternalModule)(LOCAL_SIBLING_MODULE_B));
  t.false((0, _matchers.isInternalModule)(VALID_EXTERNAL_SCOPED_MODULE_WITH_SLASH));
  t.true((0, _matchers.isInternalModule)(INTERNAL_MODULE_A));
  t.true((0, _matchers.isInternalModule)(INTERNAL_MODULE_B));
});

(0, _ava2.default)('isLocalModuleFromParentDirectory is true only for local parent modules', t => {
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(BUILTIN_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(BUILTIN_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(EXTERNAL_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(EXTERNAL_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(EXTERNAL_SCOPED_MODULE));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INTERNAL_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INTERNAL_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INVALID_EXTERNAL_SCOPED_MODULE_WITH_SLASHES));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(LOCAL_INDEX_MODULE));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(LOCAL_SIBLING_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(LOCAL_SIBLING_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(VALID_EXTERNAL_SCOPED_MODULE_WITH_SLASH));
  t.true((0, _matchers.isLocalModuleFromParentDirectory)(LOCAL_PARENT_MODULE_A));
  t.true((0, _matchers.isLocalModuleFromParentDirectory)(LOCAL_PARENT_MODULE_B));
});

(0, _ava2.default)('isLocalModuleCurrentDirectoryIndex is true only for current directory index module', t => {
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(BUILTIN_MODULE_A));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(BUILTIN_MODULE_B));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(EXTERNAL_MODULE_A));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(EXTERNAL_MODULE_B));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(EXTERNAL_SCOPED_MODULE));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(INVALID_EXTERNAL_SCOPED_MODULE_WITH_SLASHES));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(LOCAL_PARENT_MODULE_A));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(LOCAL_PARENT_MODULE_B));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(LOCAL_SIBLING_MODULE_A));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(LOCAL_SIBLING_MODULE_B));
  t.false((0, _matchers.isLocalModuleCurrentDirectoryIndex)(VALID_EXTERNAL_SCOPED_MODULE_WITH_SLASH));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INTERNAL_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INTERNAL_MODULE_B));
  t.true((0, _matchers.isLocalModuleCurrentDirectoryIndex)(LOCAL_INDEX_MODULE));
});

(0, _ava2.default)('isLocalModuleFromSiblingDirectory is true only for current directory index module', t => {
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INTERNAL_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromParentDirectory)(INTERNAL_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(BUILTIN_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(BUILTIN_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(EXTERNAL_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(EXTERNAL_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(EXTERNAL_SCOPED_MODULE));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(INVALID_EXTERNAL_SCOPED_MODULE_WITH_SLASHES));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(LOCAL_INDEX_MODULE));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(LOCAL_PARENT_MODULE_A));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(LOCAL_PARENT_MODULE_B));
  t.false((0, _matchers.isLocalModuleFromSiblingDirectory)(VALID_EXTERNAL_SCOPED_MODULE_WITH_SLASH));
  t.true((0, _matchers.isLocalModuleFromSiblingDirectory)(LOCAL_SIBLING_MODULE_A));
  t.true((0, _matchers.isLocalModuleFromSiblingDirectory)(LOCAL_SIBLING_MODULE_B));
});
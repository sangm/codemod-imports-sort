'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _compareImports = require('./compareImports');

var _compareImports2 = _interopRequireDefault(_compareImports);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('sanitizeOrder should leave default order unchanged', t => {
  t.deepEqual((0, _compareImports.sanitizeOrder)(_constants.DEFAULT_ORDER), _constants.DEFAULT_ORDER);
});

(0, _ava2.default)('sanitizeOrder should append all omitted groups', t => {
  t.deepEqual((0, _compareImports.sanitizeOrder)(['external']), ['external', ['builtin', 'internal', 'parent', 'sibling', 'index', 'scoped-external'].sort()]);
  t.deepEqual((0, _compareImports.sanitizeOrder)(['builtin', ['internal', 'parent', 'sibling', 'index']]), ['builtin', ['internal', 'parent', 'sibling', 'index'].sort(), ['external', 'scoped-external']]);
});

const BUILTIN_MODULE_A = 'fs';
const BUILTIN_MODULE_B = 'http';
const EXTERNAL_MODULE_A = 'alpha-module';
const EXTERNAL_MODULE_B = 'beta-module';
const EXTERNAL_SCOPED_MODULE = '@omega';
const INTERNAL_MODULE_A = 'src/foo';
const INTERNAL_MODULE_B = 'src/foo/bar/baz';
const LOCAL_PARENT_MODULE_A = '../delta';
const LOCAL_PARENT_MODULE_B = '../gamma';
const LOCAL_INDEX_MODULE = './';
const LOCAL_SIBLING_MODULE_A = './epsilon';
const LOCAL_SIBLING_MODULE_B = './zeta/eta';

const FIRST = -1;
const SECOND = 1;

const matchIfIsA = test => test === 'a';

(0, _ava2.default)('compareByMatcher favors matching', t => {
  t.is((0, _compareImports.compareByMatcher)(matchIfIsA, 'a', 'b'), FIRST);
  t.is((0, _compareImports.compareByMatcher)(matchIfIsA, 'b', 'a'), SECOND);
});

(0, _ava2.default)('compareByMatcher returns null if none is matching', t => {
  t.is((0, _compareImports.compareByMatcher)(matchIfIsA, 'b', 'c'), null);
});

(0, _ava2.default)('compareByMatcher returns null if both are matching', t => {
  t.is((0, _compareImports.compareByMatcher)(matchIfIsA, 'a', 'a'), null);
});

(0, _ava2.default)('compareImports favors builtin modules before all others', t => {
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, EXTERNAL_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, BUILTIN_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, EXTERNAL_SCOPED_MODULE), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_SCOPED_MODULE, BUILTIN_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, INTERNAL_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, BUILTIN_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, LOCAL_PARENT_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, BUILTIN_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, LOCAL_INDEX_MODULE), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, BUILTIN_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, LOCAL_SIBLING_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, BUILTIN_MODULE_A), SECOND);
});

(0, _ava2.default)('compareImports favors external modules before internal & local modules', t => {
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, LOCAL_PARENT_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, EXTERNAL_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(EXTERNAL_SCOPED_MODULE, LOCAL_PARENT_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, EXTERNAL_SCOPED_MODULE), SECOND);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, INTERNAL_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, EXTERNAL_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, LOCAL_INDEX_MODULE), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, EXTERNAL_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, LOCAL_SIBLING_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, EXTERNAL_MODULE_A), SECOND);
});

(0, _ava2.default)('compareImports favors internal modules before local modules', t => {
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, LOCAL_PARENT_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, INTERNAL_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, LOCAL_INDEX_MODULE), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, INTERNAL_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, LOCAL_SIBLING_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, INTERNAL_MODULE_A), SECOND);
});

(0, _ava2.default)('compareImports favors parent dir modules before other local modules', t => {
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, LOCAL_INDEX_MODULE), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, LOCAL_PARENT_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, LOCAL_SIBLING_MODULE_A), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, LOCAL_PARENT_MODULE_A), SECOND);
});

(0, _ava2.default)('compareImports favors sibling modules before local index modules', t => {
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, LOCAL_INDEX_MODULE), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, LOCAL_SIBLING_MODULE_A), SECOND);
});

(0, _ava2.default)('compareImports sorts imports of the same type alphabetically', t => {
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_A, BUILTIN_MODULE_B), FIRST);
  t.is((0, _compareImports2.default)(BUILTIN_MODULE_B, BUILTIN_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, LOCAL_PARENT_MODULE_B), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_B, LOCAL_PARENT_MODULE_A), SECOND);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, LOCAL_SIBLING_MODULE_B), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_B, LOCAL_SIBLING_MODULE_A), SECOND);
});

(0, _ava2.default)('compareImports applies custom order', t => {
  const ORDER = ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'];
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, INTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, EXTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, INTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, EXTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, INTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, EXTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, EXTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
});

(0, _ava2.default)('compareImports applies groups in custom order', t => {
  const ORDER = ['index', ['internal', 'external'], ['sibling', 'parent', 'builtin']];
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, INTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, EXTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_INDEX_MODULE, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, INTERNAL_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, INTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, INTERNAL_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_B, INTERNAL_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_B, INTERNAL_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_B, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_B, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_B, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_B, LOCAL_PARENT_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(INTERNAL_MODULE_B, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(EXTERNAL_MODULE_B, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, LOCAL_SIBLING_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, LOCAL_SIBLING_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_B, LOCAL_SIBLING_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_B, LOCAL_SIBLING_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_B, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_A, BUILTIN_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_PARENT_MODULE_B, BUILTIN_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_B, BUILTIN_MODULE_A, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_A, BUILTIN_MODULE_B, ORDER), FIRST);
  t.is((0, _compareImports2.default)(LOCAL_SIBLING_MODULE_B, BUILTIN_MODULE_B, ORDER), FIRST);
});
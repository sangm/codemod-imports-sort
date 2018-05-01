'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _jscodeshiftAvaTester = require('jscodeshift-ava-tester');

var _jscodeshiftAvaTester2 = _interopRequireDefault(_jscodeshiftAvaTester);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { testChanged, testUnchanged } = (0, _jscodeshiftAvaTester2.default)(_jscodeshift2.default, _ava2.default, _2.default);

testChanged('sort imports', `import foo from './foo'; import fs from 'fs'; let foo = 'bar';`, `import fs from 'fs'; import foo from './foo'; let foo = 'bar';`);

testChanged(`
import bar from '../bar';
import foo from '@foo';
import fooAbc from '@foo/abc';
`, `
import foo from '@foo';
import fooAbc from '@foo/abc';
import bar from '../bar';
`);

testUnchanged(`import foo from '@foo/abc'`);
testUnchanged(`let foo = 'bar';`);
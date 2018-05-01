'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeOrder = exports.compareByMatcher = undefined;

var _isBuiltinModule = require('is-builtin-module');

var _isBuiltinModule2 = _interopRequireDefault(_isBuiltinModule);

var _matchers = require('./matchers');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const concat = (x, y) => x.concat(y);

const matchers = {
  builtin: _isBuiltinModule2.default,
  external: _matchers.isExternalModule,
  'scoped-external': _matchers.isScopedExternalModule,
  internal: _matchers.isInternalModule,
  parent: _matchers.isLocalModuleFromParentDirectory,
  index: _matchers.isLocalModuleCurrentDirectoryIndex,
  sibling: _matchers.isLocalModuleFromSiblingDirectory
};
const matcherNames = Object.keys(matchers);

const compareByMatcher = exports.compareByMatcher = (matcher, a, b) => {
  const aIsMatching = matcher(a);
  if (aIsMatching === matcher(b)) {
    return null;
  }
  return aIsMatching ? -1 : 1;
};

const isValidSorterName = (name, warn = true) => {
  const isValid = matcherNames.includes(name);
  if (warn && !isValid) {
    console.warn(`You used an invalid import sort group: "${name}". Check your configuration.`);
  }
  return isValid;
};

const sanitizeOrder = exports.sanitizeOrder = order => {
  const bins = order.reduce((acc, item) => {
    if (Array.isArray(item)) {
      const group = item.filter(isValidSorterName).sort();
      if (!group.length) {
        return acc;
      }
      return [...acc, group];
    }
    if (isValidSorterName(item)) {
      return [...acc, item];
    }
    return acc;
  }, []);
  const usedSorters = bins.reduce(concat, []);
  const omittedSorters = matcherNames.filter(name => !usedSorters.includes(name));
  if (omittedSorters.length) {
    bins.push(omittedSorters.length === 1 ? omittedSorters[0] : omittedSorters.sort());
  }
  return bins;
};

exports.default = (a, b, order = _constants.DEFAULT_ORDER) => {
  const result = sanitizeOrder(order).map(group => Array.isArray(group) ? name => group.reduce((acc, matcherName) => acc === true ? true : matchers[matcherName](name), null) : matchers[group]).reduce((acc, matcher) => {
    return acc === null ? compareByMatcher(matcher, a, b) : acc;
  }, null);
  return result !== null ? result : a.localeCompare(b);
};
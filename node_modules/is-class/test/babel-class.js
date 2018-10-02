'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var test = require('tape');
var isClass = require('../is-class');

test('isClass', function (t) {
  t.plan(9);

  var F = function F() {
    _classCallCheck(this, F);
  };

  function G() {}

  t.true(isClass(F));
  t.false(isClass(G));
  t.false(isClass(''));
  t.false(isClass(0));
  t.false(isClass(null));
  t.false(isClass(undefined));
  t.false(isClass(1));
  t.false(isClass({}));
  t.false(isClass([]));
});


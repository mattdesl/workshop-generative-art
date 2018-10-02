'use strict';

var test = require('tape');
var isClass = require('../is-class');

test('isClass', function (t) {
  t.plan(10);

  class F {}
  function G() {}

  t.true(isClass(F));
  t.true(isClass(class{}));
  t.false(isClass(G));
  t.false(isClass(''));
  t.false(isClass(0));
  t.false(isClass(null));
  t.false(isClass(undefined));
  t.false(isClass(1));
  t.false(isClass({}));
  t.false(isClass([]));
});

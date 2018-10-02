(function(root) {
  var toString = Function.prototype.toString;

  function fnBody(fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/,'').replace(/\s*}[^}]*$/,'');
  }

  function isClass(fn) {
    return (typeof fn === 'function' &&
            (/^class(\s|\{\}$)/.test(toString.call(fn)) ||
              (/^.*classCallCheck\(/.test(fnBody(fn)))) // babel.js
            );
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = isClass;
    }
    exports.isClass = isClass;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return isClass;
    });
  } else {
    root.isClass = isClass;
  }

})(this);


# is-class

Check if function is an ES6 class.

# Install

```bash
npm install is-class
```

```bash
bower install is-class
```

# Usage

```javascript
var isClass = require('is-class');

class F {}
function G() {}

console.log(isClass(F)); // true
console.log(isClass(G)); // false
```

# Test

```bash
npm test
```

# License

MIT

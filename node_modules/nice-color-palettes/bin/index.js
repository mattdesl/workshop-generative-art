#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
  boolean: [ 'pretty' ]
});

var fetch = require('./fetch');

fetch(argv._[0] || 100, function (err, palettes) {
  if (err) throw err;
  var pretty = argv.pretty ? 2 : undefined;
  console.log(JSON.stringify(palettes, undefined, pretty));
});

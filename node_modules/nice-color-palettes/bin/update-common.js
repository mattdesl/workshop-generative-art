var fs = require('fs');
var path = require('path');
var fetch = require('./fetch');

var outDir = path.resolve(__dirname, '../');

fetch(1000, function (err, palettes) {
  if (err) throw err;
  write(100);
  write(200);
  write(500);
  write(1000);

  console.log(new Date().toString());

  function write (count) {
    var file = path.resolve(outDir, count + '.json');
    fs.writeFile(file, JSON.stringify(palettes.slice(0, count)), function (err) {
      if (err) console.error(err.message);
    });
  }
});

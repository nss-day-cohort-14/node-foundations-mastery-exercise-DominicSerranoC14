const [,, ...arg] = process.argv;
const { createReadStream } = require('fs');
const transformer = require('./limit-ten.js');
const es = require('event-stream');

//Create the readable stream to the words document

createReadStream('/usr/share/dict/words')
  // .pipe(es.split())
  .pipe(es.map(function (line, cb) {
    cb(null, line)
    return arg[0] === line
  }))
  .pipe(transformer)
  .pipe(process.stdout);

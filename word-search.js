const [,, ...arg] = process.argv;
const { createReadStream } = require('fs');
const es = require('event-stream');

//Local require of js file module
const transformer = require('./limit-ten.js');


///////////////////////////////////////////////
//Usage message
function checkFunctionPath() {
  arg.length > 1 ? usageMessage(): null;
}

function usageMessage() {
  process.stdout.write(`Usage: program req1 [cat /usr/share/dict/words | node word-search.js]\n`);
  process.exit(1);
}
///////////////////////////////////////////////


///////////////////////////////////////////////
//Print out the word list with the  'cat /usr/share/dict/words | node word-search.j' command
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  //If arg is zero, run a validator function
  arg.length === 0 ? checkFunctionPath(): true;

  let chunk = process.stdin.read();
  //If chunk is null, no data is being piped in
  if (chunk === null && arg.length === 0 ) {
    usageMessage();
  } else {
    //Continue process.stdin
    process.stdout.write(`data: ${chunk}`);
  }

});
///////////////////////////////////////////////


///////////////////////////////////////////////
//Begin readstream and pipe data
const wordList = createReadStream('/usr/share/dict/words')
  //Split each for on line
  .pipe(es.split())
  .pipe(es.map(function (line, cb) {
    //Only return words that start with the word the user inputs
    line.startsWith(`${arg[0]}`) ? cb(null, line + '\n') : cb();
  }))
  //Pipe to transformer
  .pipe(transformer)
  .pipe(process.stdout);
  ///////////////////////////////////////////////

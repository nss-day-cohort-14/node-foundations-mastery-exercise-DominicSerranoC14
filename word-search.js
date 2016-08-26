const [,, ...arg] = process.argv;
const { createReadStream } = require('fs');
const es = require('event-stream');

//Local require of js file module
const transformer = require('./limit-ten.js');


///////////////////////////////////////////////
//Usage message
arg.length > 1 || arg.length === 0 ? usageMessage(): null;

function usageMessage() {
  process.stdout.write(`Usage: program [string] [cat /usr/share/dict/words | node word-search.j]\n`);
  process.exit();
}
///////////////////////////////////////////////


///////////////////////////////////////////////
//Print out the word list with the  'cat /usr/share/dict/words | node word-search.j' command
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chunk = process.stdin.read();
  let i = 0;
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

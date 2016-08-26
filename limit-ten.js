const { Transform } = require('stream');

//Counter that limits how many times transform runs
let i = 0;

//Transform the data here
module.exports = Transform({
  transform (buffer, _, cb) {
    i++;
    // Only run for the first ten matches
    //If not return an empty cb()
    i <= 9 ? cb(null, buffer.toString().toLowerCase()): cb();
    //If 'i'=== 10 end the program, if not continue running
    //This is to end process.stdin usage
    i === 10 ? process.exit(): null;
  }
});

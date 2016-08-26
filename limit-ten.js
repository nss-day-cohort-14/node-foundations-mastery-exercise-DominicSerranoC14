const { Transform } = require('stream');


//Transform the data here
module.exports = Transform({
  transform (buffer, _, cb) {
    cb(null, buffer.toString().toLowerCase().slice(0,10))
  }
});

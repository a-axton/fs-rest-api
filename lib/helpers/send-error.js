var errno = require('errno');
module.exports = (err, res) => {
  let error = err.code ? errno.code[err.code].description : err;
  res.status(400).send({
    error,
    success: false
  });
}

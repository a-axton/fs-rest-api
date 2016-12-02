var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

function buildRouter (baseDir) {
  router.use((req, res, next) => {
    res.locals.baseDir = baseDir;
    next();
  });
  router.get('/tree', require('./routes/tree'));
  router.get('/stat', jsonParser, require('./routes/stat'));
  router.get('/read', jsonParser, require('./routes/read'));
  router.post('/write', jsonParser, require('./routes/write'));
  router.put('/rename', jsonParser, require('./routes/rename'));
  router.put('/move', jsonParser, require('./routes/move'));
  router.put('/append', jsonParser, require('./routes/append'));
  router.delete('/remove', jsonParser, require('./routes/remove'));
  return router;
}

module.exports = (baseDir) => buildRouter(baseDir);

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
  router.post('/stat', jsonParser, require('./routes/stat'));
  router.post('/read', jsonParser, require('./routes/read'));
  router.post('/write', jsonParser, require('./routes/write'));
  router.post('/rename', jsonParser, require('./routes/rename'));
  router.post('/move', jsonParser, require('./routes/move'));
  return router;
}

module.exports = (baseDir) => buildRouter(baseDir);

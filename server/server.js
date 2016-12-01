var express = require('express');
var app = express();
var fsAPI = require('../lib');
var path = require('path');

app.use('/fs', fsAPI(path.join(__dirname, './test-dir')));
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

process.umask(0);

module.exports = app; 

# Node Filesystem Rest API
This Express app exposes a simple API for proxying the nodejs filesystem. Doesn't allow any operations above the specified base directory.
**Warnings:** Still in active development, API may change regularly. Not recommended for production servers.
#### Documentation
https://a-axton.github.io/fs-rest-api/
#### Installation
```bash
npm install fs-rest-api
```
#### Usage
This module uses an Express router so you can use it with your existing Express apps.
```js
var express = require('express');
var app = express();
var fsAPI = require('fs-rest-api');
var path = require('path');

// set the routing prefix and base directory
app.use('/fs', fsAPI(path.join(__dirname, './test-dir')));
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
```
Allows the proper owner settings for creating directories. More here https://nodejs.org/api/process.html#process_process_umask_mask
```js
process.umask(0);
```
#### TODO
- Add tests
- Modify middleware to work for Hapi, KOA, restify

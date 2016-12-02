var fsp = require('fs-promise');
var path = require('path');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {GET} /fs/read Read
 * @apiDescription Read the contents of a file.
 * @apiGroup FS API
 * @apiName Read
 * @apiParam {String} path Mandatory file path to read. Must use as url query string.
 */
module.exports = (req, res) => {
  lockDirectory(req.query.path)
    .then(() => fsp.readFile(path.join(res.locals.baseDir, req.query.path)))
    .then((contents) => {
      res.send({
        contents: contents.toString(),
        success: true
      });
    })
    .catch((err) => sendError(err, res));
};

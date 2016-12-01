var fsp = require('fs-promise');
var path = require('path');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {POST} /fs/read Read contents of a file.
 * @apiParam {String} path Mandatory file path to read.
 */
module.exports = (req, res) => {
  lockDirectory(req.body.path)
    .then(() => fsp.readFile(path.join(res.locals.baseDir, req.body.path)))
    .then((contents) => {
      res.send({
        contents: contents.toString(),
        success: true
      });
    })
    .catch((err) => sendError(err, res));
};

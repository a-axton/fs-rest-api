var fsp = require('fs-promise');
var path = require('path');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {POST} /fs/stat Check stats of directory or file.
 * @apiParam {String} path Mandatory file path to check.
 */
module.exports = (req, res) => {
  lockDirectory(req.body.path)
    .then(() => fsp.stat(path.join(res.locals.baseDir, req.body.path)))
    .then((stats) => {
      res.send({
        stats,
        success: true
      });
    })
    .catch((err) => sendError(err, res));
};

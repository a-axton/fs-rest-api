var fsp = require('fs-promise');
var path = require('path');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {GET} /fs/stat Stat
 * @apiDescription Get stats of a file.
 * @apiGroup FS API
 * @apiName Stat
 * @apiParam {String} path Mandatory file path to check. Must use as url query string.
 */
module.exports = (req, res) => {
  lockDirectory(req.query.path)
    .then(() => fsp.stat(path.join(res.locals.baseDir, req.query.path)))
    .then((stats) => {
      res.send({
        stats,
        success: true
      });
    })
    .catch((err) => sendError(err, res));
};

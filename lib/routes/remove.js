var fsp = require('fs-promise');
var path = require('path');
var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {DELETE} /fs/remove Remove
 * @apiDescription Remove a file or folder.
 * @apiGroup FS API
 * @apiName Remove
 * @apiParam {String} path Mandatory path of file or folder.
 */
module.exports = (req, res) => {
  lockDirectory(req.body.path)
    .then(() => fsp.remove(path.join(res.locals.baseDir, req.body.path)))
    .then(() => sendDirTree(res))
    .catch((err) => sendError(err, res));
};

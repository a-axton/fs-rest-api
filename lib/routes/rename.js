var fsp = require('fs-promise');
var path = require('path');
var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {POST} /fs/rename Rename a file or folder.
 * @apiParam {String} oldPath Mandatory current path name.
 * @apiParam {String} newPath Mandatory new path name.
 */
module.exports = (req, res) => {
  const oldPath = path.join(res.locals.baseDir, req.body.oldPath);
  const newPath = path.join(res.locals.baseDir, req.body.newPath);
  lockDirectory(req.body.newPath, req.body.oldPath)
    .then(() => fsp.rename(oldPath, newPath))
    .then(() => sendDirTree(res))
    .catch((err) => sendError(err, res));
};

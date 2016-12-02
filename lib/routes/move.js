var fsp = require('fs-promise');
var path = require('path');
var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {PUT} /fs/move Move
 * @apiDescription Move a file or folder.
 * @apiGroup FS API
 * @apiName Move
 * @apiParam {String} oldPath Mandatory current path location.
 * @apiParam {String} newPath Mandatory new path location.
 */
module.exports = (req, res) => {
  const oldPath = path.join(res.locals.baseDir, req.body.oldPath);
  const newPath = path.join(res.locals.baseDir, req.body.newPath);
  lockDirectory(req.body.newPath, req.body.oldPath)
    .then(() => fsp.move(oldPath, newPath))
    .then(() => sendDirTree(res))
    .catch((err) => sendError(err, res));
};

var fsp = require('fs-promise');
var path = require('path');
var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {PUT} /fs/append Append
 * @apiDescription Append contents to a file.
 * @apiGroup FS API
 * @apiName Append
 * @apiParam {String} path Mandatory Path of file.
 * @apiParam {String} contents Mandatory Contents to append.
 */
module.exports = (req, res) => {
  const filePath = path.join(res.locals.baseDir, req.body.path);
  lockDirectory(req.body.path)
    .then(() => fsp.ensureDir(dirPath))
    .then(() => fsp.appendFile(filePath, req.body.contents))
    .then(() => sendDirTree(res))
    .catch((err) => sendError(err, res));
};

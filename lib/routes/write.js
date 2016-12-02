var fsp = require('fs-promise');
var path = require('path');
var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
var lockDirectory = require('../helpers/lock-directory');
/**
 * @api {POST} /fs/write Write
 * @apiDescription Create a new directory or file.
 * @apiGroup FS API
 * @apiName Write
 * @apiParam {String} path Mandatory file path of new file or directory.
 * @apiParam {String} filename Optional file name, leave blank if creating directory.
 * @apiParam {String} contents Optional contents of file.
 */
module.exports = (req, res) => {
  const dirPath = path.join(res.locals.baseDir, req.body.path);
  lockDirectory(req.body.path)
    .then(() => fsp.ensureDir(dirPath))
    .then(() => {
      if (req.body.filename) {
        let contents = req.body.contents || '';
        let filePath = path.join(dirPath, req.body.filename);
        return fsp.writeFile(filePath, contents);
      }
      return;
    })
    .then(() => sendDirTree(res))
    .catch((err) => sendError(err, res));
};

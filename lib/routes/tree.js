var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
/**
 * @api {GET} /fs/tree Directory Tree
 * @apiDescription Get the current file and directory tree of the base directory.
 * @apiGroup FS API
 * @apiName Tree
 */
module.exports = (req, res, next) => {
  sendDirTree(res)
    .catch((err) => sendError(err, res));
};

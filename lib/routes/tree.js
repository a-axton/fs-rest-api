var sendDirTree = require('../helpers/send-dir-tree');
var sendError = require('../helpers/send-error');
/**
 * @api {GET} /fs/tree Get JSON tree of root directory.
 */
module.exports = (req, res, next) => {
  sendDirTree(res)
    .catch((err) => sendError(err, res));
};

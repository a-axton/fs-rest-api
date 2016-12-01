var dirToJson = require('dir-to-json');
module.exports = (res) => {
  return dirToJson(res.locals.baseDir)
    .then((dirTree) => {
      res.send({
        dirTree,
        success: true
      });
    });
}

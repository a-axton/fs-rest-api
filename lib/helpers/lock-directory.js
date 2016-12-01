module.exports = function () {
  let paths = [...arguments];
  return new Promise((reslove, reject) => {
    paths.forEach((path, i) => {
      if (path.match('../')) {
        reject('can\'t access directories above base dir');
      }
    });
    reslove();
  });
};

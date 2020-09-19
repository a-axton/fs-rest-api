module.exports = function () {
  let paths = [...arguments];
  return new Promise((resolve, reject) => {
    paths.forEach((path, i) => {
      if (path.includes('../')) {
        reject('can\'t access directories above base dir');
      }
    });
    resolve();
  });
};

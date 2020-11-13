function isStable(res) {
  const { x, y, z } = res;
  console.log('x:', x, 'y:', y, 'z:', z);
  if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1 && Math.abs(z) < 0.1) {
    return true;
  }
  return false;
}

module.exports = {
  isStable,
};

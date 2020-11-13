function compareVersion(v1, v2) {
  const v1Array = v1.split('.');
  const v2Array = v2.split('.');
  const len = Math.max(v1Array.length, v2Array.length);

  while (v1Array.length < len) {
    v1Array.push('0');
  }
  while (v2Array.length < len) {
    v2Array.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1Array[i], 10);
    const num2 = parseInt(v2Array[i], 10);

    if (num1 > num2) {
      return 1;
    } if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

module.exports = compareVersion;

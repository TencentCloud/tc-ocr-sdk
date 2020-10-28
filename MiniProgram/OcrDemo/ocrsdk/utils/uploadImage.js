const sign = require('../utils/sign');
const ACTION_ENUM = require('../constant/action');

/**
 * 上传照片，送检
 */
function uploadImage(detail) {
  return new Promise((resolve) => {
    const { side, filePath } = detail;
    const { ocrType } = wx.clientInfo;
    const action = ACTION_ENUM[ocrType];

    // 双面特殊处理
    if (side) {
      if (!wx.clientInfo.ocrOption) {
        wx.clientInfo.ocrOption = {};
      }
      wx.clientInfo.ocrOption.CardSide = side;
    }

    const res = sign.sign(action, filePath);
    resolve(res);
  });
}

module.exports = uploadImage;

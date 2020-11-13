import ROUTE_ENUM from './constant/route';
import CATEGORY_ENUM from './constant/category';
import { getTheme } from './constant/theme';

export function start(params) {
  const {
    getAuthorization,
    secretId,
    secretKey,
    ocrType,
    ocrOption,
    cameraConfig,
    resultPage,
    resultPageConfig,
    theme,
    success,
    fail,
  } = params;

  if (!getAuthorization && (!secretId || !secretKey)) {
    wx.showToast({
      icon: 'none',
      duration: 3000,
      title: 'getAuthorization和（secretId,secretKey）不能都为空',
    });
    return false;
  }
  if (!ocrType) {
    wx.showToast({
      icon: 'none',
      duration: 3000,
      title: '参数ocrType不能为空',
    });
    return false;
  }
  if (!success) {
    wx.showToast({
      icon: 'none',
      duration: 3000,
      title: '请设置success函数',
    });
    return false;
  }
  wx.clientInfo = {
    getAuthorization,
    secretId,
    secretKey,
    ocrType,
    ocrOption,
    cameraConfig,
    resultPage: !!resultPage,
    resultPageConfig,
    theme: getTheme(theme),
    onFinish: success,
    fail,
  };
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.camera']) {
        wx.authorize({
          scope: 'scope.camera',
          success() {
            wx.navigateTo({
              url:
                `/ocrsdk/pages/${ROUTE_ENUM[ocrType]}`,
            });
          },
          fail() {
            wx.showModal({
              title: '提示',
              content: '请打开摄像头权限',
              confirmText: '去设置',
              success(res) {
                if (res.confirm) {
                  wx.openSetting();
                } else if (res.cancel) {
                  return;
                }
              },
            });
          },
        });
      } else {
        wx.navigateTo({
          url:
            `/ocrsdk/pages/${ROUTE_ENUM[ocrType]}`,
        });
      }
    },
  });
}

export const OcrType = CATEGORY_ENUM;

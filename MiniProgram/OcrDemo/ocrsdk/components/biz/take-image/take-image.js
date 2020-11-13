const { isStable } = require('./utils');
const compareVersion = require('../../../utils/compareVersion');

Component({
  properties: {
    side: {
      type: String,
    },
  },

  data: {
    isAutoMode: false,
    maxTry: 3,
    autoCount: 0,
    isGyroscopeOn: false,
    isTorchOn: false,
    disableAlbum: false,
  },


  attached() {
    const { theme, cameraConfig, ocrType } = wx.clientInfo;
    const currentVersion = wx.getSystemInfoSync().SDKVersion;
    const supportAutoMode = compareVersion(currentVersion, '2.12.2') >= 0;
    const isAutoMode = !!(supportAutoMode && cameraConfig && cameraConfig.autoMode);
    const maxTry = cameraConfig && cameraConfig.maxTry ? cameraConfig.maxTry : 3;
    const disableAlbum = !!(cameraConfig && cameraConfig.disableAlbum);
    this.setData({
      theme,
      isAutoMode,
      maxTry,
      disableAlbum,
      category: ocrType,
    });
    setTimeout(() => {
      this.startAuto();
      if (isAutoMode) {
        this.barDown = true;
        this.barAnimation = wx.createAnimation({
          duration: 1500,
          delay: 0,
          timingFunction: 'linear',
        });
        this.reAnimation();
      };
    }, 2000);
  },

  detached() {
    this.setData({
      isTorchOn: false,
    });
    this.endAuto();
  },

  methods: {
    /* 自动识别模式下的动画效果 */
    reAnimation() {
      const curBarDown = this.barDown;
      if (curBarDown) {
        this.barAnimation.translateY('390rpx').step();
        this.barDown = !curBarDown;
      } else {
        this.barAnimation.translateY(0).step();
        this.barDown = !curBarDown;
      }
      this.setData({
        barMove: this.barAnimation.export(),
      });
    },

    /* 打开陀螺仪，开始自动识别 */
    startAuto() {
      const { isAutoMode, maxTry, autoCount } = this.data;
      if (!isAutoMode) {
        return;
      };
      if (autoCount >= maxTry) {
        const self = this;
        wx.showModal({
          title: '提示',
          content: '未能识别到，是否切换到拍照模式？',
          confirmText: '切换模式',
          success(res) {
            if (res.confirm) {
              self.setData({
                isAutoMode: false,
              });
            } else if (res.cancel) {
              self.restartAuto();
            }
          },
        });
        return;
      };
      wx.startGyroscope({
        success: () => {
          this.setData({ isGyroscopeOn: true });
        },
      });
      wx.onGyroscopeChange((res) => {
        this.autoTake(res);
      });
    },

    /* 自动拍摄 */
    async autoTake(res) {
      const { autoCount } = this.data;
      if (isStable(res)) {
        this.endAuto();
        this.setData({
          autoCount: autoCount + 1,
        }, () => {
          this.takeImage();
        });
      };
    },

    /* 关闭陀螺仪 */
    endAuto() {
      const { isGyroscopeOn } = this.data;
      if (isGyroscopeOn) {
        wx.offGyroscopeChange();
        wx.stopGyroscope({
          success: () => {
            this.setData({ isGyroscopeOn: false });
          },
        });
      }
    },

    /* 重启自动模式 */
    restartAuto() {
      this.setData({
        autoCount: 0,
      });
      setTimeout(() => {
        this.startAuto();
      }, 2000);
    },

    /* 从相册选择照片 */
    chooseImage() {
      this.endAuto();
      this.setData({
        isAutoMode: false,
      });
      const { side } = this.properties;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: (res) => {
          const detail = {
            filePath: res.tempFilePaths[0],
            side,
          };
          this.triggerEvent('onImageReady', detail);
        },
      });
    },

    /* 拍摄照片 */
    takeImage() {
      const { side } = this.properties;
      const { isAutoMode } = this.data;
      const ctx = wx.createCameraContext();
      ctx.takePhoto({
        quality: 'normal',
        success: (res) => {
          /* 通知页面图片已准备好 */
          const detail = {
            filePath: res.tempImagePath,
            side,
            isAuto: isAutoMode,
          };
          this.triggerEvent('onImageReady', detail);
        },
      });
    },

    /* 手电筒开关 */
    toggleTorch() {
      if (wx.canIUse('camera.flash.torch')) {
        const { isTorchOn } = this.data;
        this.setData({
          isTorchOn: !isTorchOn,
        });
      } else {
        wx.showToast({
          title: '该版本暂时不支持手电筒功能',
          icon: 'none',
          duration: 3000,
        });
      }
    },
  },
});

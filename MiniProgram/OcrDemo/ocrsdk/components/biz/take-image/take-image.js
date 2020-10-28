Component({
  properties: {
    side: {
      type: String,
    },
  },

  data: {
    isTorchOn: false,
  },

  attached() {
    const { theme, ocrType } = wx.clientInfo;
    this.setData({
      theme,
      category: ocrType,
    });
  },

  methods: {
    /* 从相册选择照片 */
    chooseImage() {
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
      const ctx = wx.createCameraContext();
      ctx.takePhoto({
        quality: 'normal',
        success: (res) => {
          /* 关闭手电筒 */
          this.setData({
            isTorchOn: false,
          });

          /* 通知页面图片已准备好 */
          const detail = {
            filePath: res.tempImagePath,
            side,
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

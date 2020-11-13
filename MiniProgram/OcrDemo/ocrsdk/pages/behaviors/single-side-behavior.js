const mapOcrToDisplay = require('../../utils/mapOcrToDisplay');
const ocrFinishBehavior = require('./ocr-finish-behavior');
const modifyResultBehavior = require('./modify-result-behavior');
const uploadBehavior = require('./upload-behavior');
const initBehavior = require('./init-behavior');

module.exports = Behavior({
  behaviors: [initBehavior, ocrFinishBehavior, modifyResultBehavior, uploadBehavior],

  data: {
    imageReady: false,
    imageDetail: {},
    ocrResponse: null,
  },

  methods: {
    /**
     * 用户选择好了照片(拍摄或者从相册选择)，送检
     */
    async onImageReady(e) {
      const { isAuto } = e.detail;
      if (!isAuto) {
        await this.setData({
          imageReady: true,
        });
      }
      await this.setData({
        imageDetail: e.detail,
      });
      this.upload(e);
    },

    /**
     * ocr成功callback
     */
    onOcrSuccess(detail, res) {
      const { resultPage } = this.data;
      const ocrResponse = mapOcrToDisplay(res);
      this.setData({
        ocrResponse,
        originResult: res,
      }, () => {
        if (!resultPage) {
          this.onFinished();
        }
      });
    },

    /**
     * ocr失败callback
     */
    onOcrFail(detail, res) {
      const { fail } = wx.clientInfo;
      const { resultPage } = this.data;
      const { Message } = res.Error;
      wx.showToast({
        title: `${Message}，${resultPage ? '请点击图片重新尝试' : '请重新拍摄/选择照片'}`,
        icon: 'none',
        duration: 3000,
      });
      fail(res);
    },

    /**
     * 图片被点击
     */
    onImageTap() {
      this.setData({
        imageReady: false,
        ocrResponse: null,
      });
    },
  },
});

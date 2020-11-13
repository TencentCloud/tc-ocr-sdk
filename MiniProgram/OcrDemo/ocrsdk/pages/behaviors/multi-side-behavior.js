const SIDE_ENUM = require('../../constant/side.js');
const { RESULT_ENUM } = require('../../constant/result');
const mapOcrToDisplay = require('../../utils/mapOcrToDisplay');
const ocrFinishBehavior = require('./ocr-finish-behavior');
const modifyResultBehavior = require('./modify-result-behavior');
const uploadBehavior = require('./upload-behavior');
const initBehavior = require('./init-behavior');

module.exports = Behavior({
  behaviors: [initBehavior, ocrFinishBehavior, modifyResultBehavior, uploadBehavior],

  data: {
    frontSidePath: '',
    backSidePath: '',
    frontState: '',
    backState: '',
    ocrResponse: null,
  },

  methods: {
    /**
     * 用户选择好了照片(拍摄或者从相册选择)，送检
     */
    async onImageReady(e) {
      // 关闭摄像头，保持文件路径
      const { side, filePath, isAuto } = e.detail;
      if (!isAuto) {
        switch (side) {
          case SIDE_ENUM.FRONT:
            await this.setData({
              showCamera: false,
              frontSidePath: filePath,
              frontState: 'waiting',
            });
            break;
          case SIDE_ENUM.BACK:
            this.setData({
              showCamera: false,
              backSidePath: filePath,
              backState: 'waiting',
            });
            break;
        };
      }
      this.upload(e);
    },

    /**
     * ocr成功callback
     */
    onOcrSuccess(detail, res) {
      const { ocrType } = wx.clientInfo;
      const previousResult = this.data.ocrResponse;
      const previousOriginResult = this.data.originResult;
      const { side, filePath } = detail;

      const newResponse = mapOcrToDisplay(res);
      Object.keys(newResponse).forEach((item) => {
        newResponse[item].side = side;
      });

      const newOrigin = { ...previousOriginResult };

      const { optionalResultKey } = RESULT_ENUM[ocrType];
      optionalResultKey.forEach((item) => {
        if (!newOrigin[item]) {
          newOrigin[item] = {};
        }
        newOrigin[item][side] = res[item];
      });

      if (!newOrigin.RequestId) {
        newOrigin.RequestId = {};
      }
      newOrigin.RequestId[side] = res.RequestId;

      if (side === SIDE_ENUM.FRONT) {
        this.setData({
          showCamera: false,
          frontSidePath: filePath,
          frontState: 'success_no_circle',
        });
      } else {
        this.setData({
          showCamera: false,
          backSidePath: filePath,
          backState: 'success_no_circle',
        });
      }

      this.setData({
        ocrResponse: {
          ...previousResult,
          ...newResponse,
        },
        originResult: newOrigin,
      });
    },

    /**
     * ocr失败callback
     */
    onOcrFail(detail, res) {
      const { fail } = wx.clientInfo;
      const { Message } = res.Error;
      const { side } = detail;
      if (side === SIDE_ENUM.FRONT) {
        this.setData({ frontState: 'warn' });
      } else {
        this.setData({ backState: 'warn' });
      }
      wx.showToast({
        title: `${Message}，请点击图片重新尝试`,
        icon: 'none',
        duration: 3000,
      });
      fail(res);
    },

  },
});

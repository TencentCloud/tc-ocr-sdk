const uploadImage = require('../../utils/uploadImage');

module.exports = Behavior({
  methods: {
    async upload(e) {
      const { isAuto } = e.detail;
      if (!isAuto) {
        wx.showLoading({
          title: '识别中',
          mask: true,
        });
      };

      // 获取临时密钥
      const { getAuthorization } = wx.clientInfo;
      if (getAuthorization) {
        const authRes = await getAuthorization();
        console.log('authRes', authRes);
        const { tmpSecretId, tmpSecretKey, token } = authRes;
        if (!tmpSecretId || !tmpSecretKey) {
          wx.showToast({
            icon: 'none',
            duration: 3000,
            title: '获取密钥失败',
          });
          return false;
        }
        wx.clientInfo.tmpSecretId = tmpSecretId;
        wx.clientInfo.tmpSecretKey = tmpSecretKey;
        wx.clientInfo.token = token;
      }
      const res = await uploadImage(e.detail);
      wx.hideLoading();
      if (res.Error) {
        if (isAuto) {
          this.selectComponent('#takeImage').startAuto();
        } else {
          this.onOcrFail(e.detail, res);
        };
      } else {
        if (isAuto) {
          this.setData({ imageReady: true });
        };
        this.onOcrSuccess(e.detail, res);
      }
    },
  },
});

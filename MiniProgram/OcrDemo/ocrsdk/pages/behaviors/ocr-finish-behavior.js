import mapDisplayToOcr from '../../utils/mapDisplayToOcr';
import { RESULT_ENUM } from '../../constant/result';

module.exports = Behavior({
  data: {
    modifiable: false,
  },

  attached() {
    const { resultPageConfig } = wx.clientInfo;
    if (resultPageConfig) {
      const { modifiable } = resultPageConfig;
      this.setData({
        modifiable: !!modifiable,
      });
    }
  },

  methods: {
    onFinished() {
      /**
       * 拼装最后返回给客户的结果result
       */
      const { originResult } = this.data;
      const category = wx.clientInfo.ocrType;
      const result = mapDisplayToOcr(this.data.ocrResponse);
      const { optionalResultKey } = RESULT_ENUM[category];
      if (optionalResultKey) {
        optionalResultKey.forEach((item) => {
          result[item] = originResult[item];
        });
      }
      result.RequestId = originResult.RequestId;

      wx.clientInfo.onFinish(result);
    },
  },
});

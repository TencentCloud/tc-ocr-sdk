// 引入 OCR SDK 文件
const ocrSdk = require('../../ocrsdk/index');
const { OcrType } = ocrSdk;
const { secretId, secretKey } = require('../config');

Page({
  data: {
    result: null,
    cardList: [
      {
        type: OcrType.ID_CARD,
        title: '身份证（双面）',
        text: '识别身份证件',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-id-front.svg',
        config: { CropIdCard: true, CropPortrait: true },
      },
      {
        type: OcrType.ID_CARD_FRONT,
        title: '身份证正面',
        text: '人像面',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-id-front.svg',
        config: { CropIdCard: true, CropPortrait: true },
      },
      {
        type: OcrType.ID_CARD_BACK,
        title: '身份证反面',
        text: '国徽面',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-id-back.svg',
        config: { CropIdCard: true, CropPortrait: true },
      },
      {
        type: OcrType.BANK_CARD,
        title: '银行卡',
        text: '识别银行卡号码等',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-bank.svg',
      },
      {
        type: OcrType.BUSINESS_CARD,
        title: '名片',
        text: '扫描名片识别内容',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-business.svg',
      },
    ],
  },

  onLoad(params) {
    if (params && params.result) {
      this.setData({
        result: JSON.parse(params.result),
      });
    }
  },

  onItemTap(e) {
    const { item } = e.currentTarget.dataset;
    const { type, config } = item;
    ocrSdk.start({
      secretId,
      secretKey,
      ocrType: type,
      ocrOption: {
        Config: config,
      },
      resultPage: true,
      resultPageConfig: {
        // modifiable: true,
      },
      // theme: 'native',
      success: (res) => {
        console.log('ocr result is:', res);
        wx.navigateTo({
          url: '/demo/index/index',
        });
      },
      fail: (error) => {
        console.log('ocr failed:', error);
      },
    });
  },
});

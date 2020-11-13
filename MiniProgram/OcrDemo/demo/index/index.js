// 引入 OCR SDK 文件
const ocrSdk = require('../../ocrsdk/index');
const { OcrType } = ocrSdk;
const { secretId, secretKey } = require('../config');

Page({
  data: {
    themes: [
      {
        theme: 'primary',
        color: '#006EFF',
      },
      {
        theme: 'native',
        color: '#07C160',
      },
    ],
    maxTryArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    displayContent: 'cardList',
    selectedTheme: 0,
    maxTryKey: 2,
    autoMode: false,
    resultPage: false,
    modifiable: false,
    disableAlbum: false,
    cardList: [
      {
        type: OcrType.ID_CARD,
        title: '身份证',
        text: '识别身份证件',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/card-id-front.svg',
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
    const { themes, selectedTheme, autoMode, maxTryArray, maxTryKey, resultPage, modifiable, disableAlbum } = this.data;
    ocrSdk.start({
      secretId,
      secretKey,
      ocrType: type,
      ocrOption: {
        Config: config,
      },
      cameraConfig: {
        autoMode,
        maxTry: maxTryArray[maxTryKey],
        disableAlbum,
      },
      resultPage,
      resultPageConfig: {
        modifiable,
      },
      theme: themes[selectedTheme].theme,
      success: (res) => {
        console.log('ocr result is:', res);
        if (!resultPage) {
          wx.showToast({
            icon: 'success',
            duration: 3000,
            title: '识别成功',
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 3000);
        } else {
          wx.navigateBack();
        }
      },
      fail: (error) => {
        console.log('ocr failed:', error);
      },
    });
  },

  toggleSettings() {
    const { displayContent } = this.data;
    this.setData({
      displayContent: displayContent === 'settings' ? 'cardList' : 'settings',
    });
  },

  pickTheme(e) {
    const selectedTheme = e.detail.value;
    this.setData({
      selectedTheme,
    });
  },

  toggleAutoMode(e) {
    this.setData({
      autoMode: e.detail.value,
    });
  },

  setMaxTry(e) {
    const maxTryKey = e.detail.value;
    this.setData({
      maxTryKey,
    });
  },

  toggleResultPage(e) {
    this.setData({
      resultPage: e.detail.value,
    });
  },

  toggleModifiable(e) {
    this.setData({
      modifiable: e.detail.value,
    });
  },
  toggleAlbum(e) {
    this.setData({
      disableAlbum: e.detail.value,
    });
  },
});

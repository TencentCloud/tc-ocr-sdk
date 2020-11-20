const configExplanation = require('../configExplanation');

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
    resultPage: true,
    modifiable: false,
    disableAlbum: false,
    cardList: [
      {
        modeType: 'auto',
        title: '自动识别模式',
        text: '无需点击拍照，系统捕捉到证件自动识别',
        imgNative: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/autoModeNative.svg',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/autoMode.svg',
      },
      {
        modeType: 'manual',
        title: '拍照识别模式',
        text: '点击拍照后，系统再进行识别',
        imgNative: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/takePicNative.svg',
        img: 'https://ocr-static-1254418846.file.myqcloud.com/mpsdk/images/takePicPrimary.svg',
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
    const { modeType } = item;
    const { themes, selectedTheme, maxTryArray, maxTryKey, resultPage, modifiable, disableAlbum } = this.data;
    wx.demoConfig = {
      theme: themes[selectedTheme].theme,
      autoMode: !!(modeType === 'auto'),
      maxTry: maxTryArray[maxTryKey],
      resultPage,
      modifiable,
      disableAlbum,
    };
    wx.navigateTo({
      url:
        '/demo/list/list',
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
    console.log(selectedTheme)
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
  onConfigTap(e) {
    const { configtype } = e.currentTarget.dataset;
    const title = configExplanation[configtype].title;
    const content = configExplanation[configtype].content;
    wx.showModal({
      title,
      content,
      showCancel: false,
      confirmText: '我知道了',
    })
  }
});

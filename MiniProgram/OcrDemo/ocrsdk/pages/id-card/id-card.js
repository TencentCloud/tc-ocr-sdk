const multiSideBehavior = require('../behaviors/multi-side-behavior');
const CATEGORY_ENUM = require('../../constant/category.js');
// const SIDE_ENUM = require('../../constant/side.js')

Page({

  behaviors: [multiSideBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    category: CATEGORY_ENUM.ID_CARD,
    selectedSide: '',
    showCamera: false,
  },

  /**
   * 卡片被点击
   */
  onItemTap(e) {
    const { side } = e.currentTarget.dataset;
    const { ocrResponse } = this.data;

    // 清除上次结果
    if (ocrResponse) {
      let temp = {};
      Object.keys(ocrResponse).forEach((item) => {
        if (ocrResponse[item].side !== side) {
          temp[item] = ocrResponse[item];
        }
      });
      if (Object.keys(temp).length === 0) {
        temp = null;
      }
      this.setData({ ocrResponse: temp });
    }

    this.setData({
      showCamera: true,
      selectedSide: side,
    });
  },
});

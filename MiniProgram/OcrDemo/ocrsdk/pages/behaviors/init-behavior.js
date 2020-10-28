import { themeToRGB, themeToSeal } from '../../constant/theme';
import TITLE_ENUM from '../../constant/title';
import CATEGORY_ENUM from '../../constant/category';

module.exports = Behavior({
  data: {
    theme: null,
    themeColor: null,
    sealTheme: null,
    resultPage: false,
  },

  attached() {
    const { theme, resultPage, ocrType } = wx.clientInfo;
    wx.setNavigationBarTitle({
      title: TITLE_ENUM[ocrType],
    });
    this.setData({
      theme,
      themeColor: themeToRGB(theme),
      sealTheme: themeToSeal(theme),
      resultPage,
    });
    if (ocrType === CATEGORY_ENUM.ID_CARD_FRONT) {
      this.setData({ side: 'FRONT' });
    }
    if (ocrType === CATEGORY_ENUM.ID_CARD_BACK) {
      this.setData({ side: 'BACK' });
    }
  },
});

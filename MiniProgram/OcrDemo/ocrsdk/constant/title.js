import CATEGORY_ENUM from './category';

const TITLE_ENUM = {
  [CATEGORY_ENUM.ID_CARD]: '身份证识别',
  [CATEGORY_ENUM.ID_CARD_FRONT]: '身份证正面识别',
  [CATEGORY_ENUM.ID_CARD_BACK]: '身份证反面识别',
  [CATEGORY_ENUM.BANK_CARD]: '银行卡识别',
  [CATEGORY_ENUM.BUSINESS_CARD]: '名片识别',
};

module.exports = TITLE_ENUM;

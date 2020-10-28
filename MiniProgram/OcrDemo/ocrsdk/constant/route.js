import CATEGORY_ENUM from './category';

const ROUTE_ENUM = {
  [CATEGORY_ENUM.ID_CARD]: 'id-card/id-card',
  [CATEGORY_ENUM.ID_CARD_FRONT]: 'index/index',
  [CATEGORY_ENUM.ID_CARD_BACK]: 'index/index',
  [CATEGORY_ENUM.BANK_CARD]: 'index/index',
  [CATEGORY_ENUM.BUSINESS_CARD]: 'index/index',
};

module.exports = ROUTE_ENUM;

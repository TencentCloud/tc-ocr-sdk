import CATEGORY_ENUM from './category';

const RESULT_ENUM = {
  [CATEGORY_ENUM.ID_CARD]: {
    resultType: 1,
    optionalResultKey: ['AdvancedInfo'],
  },
  [CATEGORY_ENUM.ID_CARD_FRONT]: {
    resultType: 1,
    optionalResultKey: ['AdvancedInfo'],
  },
  [CATEGORY_ENUM.ID_CARD_BACK]: {
    resultType: 1,
    optionalResultKey: ['AdvancedInfo'],
  },
  [CATEGORY_ENUM.BANK_CARD]: {
    resultType: 1,
  },
  [CATEGORY_ENUM.BUSINESS_CARD]: {
    resultType: 2,
    resultKey: 'BusinessCardInfos',
    optionalResultKey: ['RetImageBase64', 'Angle'],
  },
};

const FIELD_ENUM = {
  [CATEGORY_ENUM.BANK_CARD]: {
    CardNo: '卡号',
    BankInfo: '银行信息',
    ValidDate: '有效期',
  },
  [CATEGORY_ENUM.ID_CARD]: {
    Name: '姓名',
    Sex: '性别',
    Nation: '民族',
    Birth: '出生日期',
    Address: '地址',
    IdNum: '身份证号',
    Authority: '发证机关',
    ValidDate: '证件有效期',
  },
  [CATEGORY_ENUM.ID_CARD_FRONT]: {
    Name: '姓名',
    Sex: '性别',
    Nation: '民族',
    Birth: '出生日期',
    Address: '地址',
    IdNum: '身份证号',
    Authority: '发证机关',
    ValidDate: '证件有效期',
  },
  [CATEGORY_ENUM.ID_CARD_BACK]: {
    Name: '姓名',
    Sex: '性别',
    Nation: '民族',
    Birth: '出生日期',
    Address: '地址',
    IdNum: '身份证号',
    Authority: '发证机关',
    ValidDate: '证件有效期',
  },
};

module.exports = {
  RESULT_ENUM,
  FIELD_ENUM,
};

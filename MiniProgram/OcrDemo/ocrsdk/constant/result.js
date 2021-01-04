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
    CardNo: {
      title: '卡号',
      type: 'input',
    },
    BankInfo: {
      title: '银行信息',
      type: 'input',
    },
    ValidDate: {
      title: '有效期',
      type: 'input',
    },
  },
  [CATEGORY_ENUM.ID_CARD]: {
    Name: {
      title: '姓名',
    },
    Sex: {
      title: '性别',
      type: 'input',
    },
    Nation: {
      title: '民族',
      type: 'input',
    },
    Birth: {
      title: '出生日期',
      type: 'input',
    },
    Address: {
      title: '地址',
    },
    IdNum: {
      title: '身份证号',
      type: 'input',
    },
    Authority: {
      title: '发证机关',
    },
    ValidDate: {
      title: '证件有效期',
      type: 'input',
    },
  },
  [CATEGORY_ENUM.ID_CARD_FRONT]: {
    Name: {
      title: '姓名',
    },
    Sex: {
      title: '性别',
      type: 'input',
    },
    Nation: {
      title: '民族',
      type: 'input',
    },
    Birth: {
      title: '出生日期',
      type: 'input',
    },
    Address: {
      title: '地址',
    },
    IdNum: {
      title: '身份证号',
      type: 'input',
    },
    Authority: {
      title: '发证机关',
    },
    ValidDate: {
      title: '证件有效期',
      type: 'input',
    },
  },
  [CATEGORY_ENUM.ID_CARD_BACK]: {
    Name: {
      title: '姓名',
    },
    Sex: {
      title: '性别',
      type: 'input',
    },
    Nation: {
      title: '民族',
      type: 'input',
    },
    Birth: {
      title: '出生日期',
      type: 'input',
    },
    Address: {
      title: '地址',
    },
    IdNum: {
      title: '身份证号',
      type: 'input',
    },
    Authority: {
      title: '发证机关',
    },
    ValidDate: {
      title: '证件有效期',
      type: 'input',
    },
  },
};

module.exports = {
  RESULT_ENUM,
  FIELD_ENUM,
};

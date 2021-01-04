import { RESULT_ENUM, FIELD_ENUM } from '../constant/result';

function mapOcrToDisplay(ocrResult) {
  const { ocrType } = wx.clientInfo;
  const displayResult = {};
  const { resultType, resultKey } = RESULT_ENUM[ocrType];
  const meta = FIELD_ENUM[ocrType];
  const fieldResult = ocrResult[resultKey];
  switch (resultType) {
    case 1:
      Object.keys(ocrResult).forEach((item) => {
        if (meta[item] && ocrResult[item]) {
          displayResult[item] = {
            title: meta[item].title,
            value: ocrResult[item],
            type: meta[item].type || (ocrResult[item].length > 12 ? 'textarea' : 'input'),
          };
        }
      });
      break;

    case 2:
      fieldResult.forEach((field) => {
        displayResult[field.Name] = {
          title: field.Name,
          value: field.Value,
          type: field.Value.length > 12 ? 'textarea' : 'input',
        };
      });
      break;
  }
  return displayResult;
}

module.exports = mapOcrToDisplay;

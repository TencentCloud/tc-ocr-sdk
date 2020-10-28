import { RESULT_ENUM } from '../constant/result';

function mapDisplayToOcr(displayData) {
  const { ocrType } = wx.clientInfo;
  const result = {};
  const { resultType, resultKey } = RESULT_ENUM[ocrType];
  switch (resultType) {
    case 1:
      Object.keys(displayData).forEach((item) => {
        result[item] = displayData[item].value;
      });
      break;

    case 2:
      result[resultKey] = [];
      Object.keys(displayData).forEach((item) => {
        result[resultKey].push({
          Name: item,
          Value: displayData[item].value,
        });
      });
      break;
  }
  return result;
}

module.exports = mapDisplayToOcr;

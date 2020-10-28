import { SHA256, HmacSHA256, enc } from '../third/crypto';
import SDK_VERSION from '../constant/version';

export function sign(action, filePath) {
  return new Promise((resolve) => {
    const {
      getAuthorization,
      tmpSecretId,
      tmpSecretKey,
      secretId,
      secretKey,
      ocrOption,
      token,
    } = wx.clientInfo;
    const finalSecretId = getAuthorization ? tmpSecretId : secretId;
    const finalSecretKey = getAuthorization ? tmpSecretKey : secretKey;
    const host = 'ocr.tencentcloudapi.com';
    const service = 'ocr';
    const version = '2018-11-19';

    const timestamp = Math.round(Date.now() / 1000);
    const algorithm = 'TC3-HMAC-SHA256';

    // step 1: build canonical request string
    const httpRequestMethod = 'POST';
    const canonicalUri = '/';
    const canonicalQueryString = '';
    const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${host}\n`;
    const signedHeaders = 'content-type;host';
    const temPayload = {
      ImageBase64: wx.getFileSystemManager().readFileSync(filePath, 'base64'),
    };
    if (ocrOption) {
      Object.keys(ocrOption).forEach((item) => {
        if (item === 'Config') {
          temPayload[item] = JSON.stringify(ocrOption[item]);
        } else {
          temPayload[item] = ocrOption[item];
        }
      });
    }
    const payload = JSON.stringify(temPayload);
    const hashedRequestPayload = SHA256(payload);

    const canonicalRequest = `${httpRequestMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;


    // step 2: build string to sign
    const t = new Date();
    const date = t.toISOString().substr(0, 10);
    const credentialScope = `${date}/${service}/tc3_request`;
    const hashedCanonicalRequest = SHA256(canonicalRequest);
    const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;


    const secretDate = HmacSHA256(date, `TC3${finalSecretKey}`);
    const secretService = HmacSHA256(service, secretDate);
    const secretSigning = HmacSHA256('tc3_request', secretService);

    const signature = enc.Hex.stringify(HmacSHA256(stringToSign, secretSigning));


    const Algorithm = 'TC3-HMAC-SHA256';
    const SignedHeaders = 'content-type;host';
    const Authorization =      `${Algorithm
    } `
      + `Credential=${
        finalSecretId
      }/${
        credentialScope
      }, `
      + `SignedHeaders=${
        SignedHeaders
      }, `
      + `Signature=${
        signature}`;


    const header = {
      Authorization,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-TC-Action': action,
      'X-TC-Timestamp': timestamp,
      'X-TC-Version': version,
      'X-TC-Region': 'ap-guangzhou',
      'X-TC-RequestClient': `WXAPP_SDK_OcrSDK_${SDK_VERSION}`,
    };
    if (getAuthorization) {
      header['X-TC-Token'] = token;
    }
    wx.request({
      url: 'https://ocr.tencentcloudapi.com',
      data: payload,
      method: 'POST',
      header,
      success({ data: { Response } }) {
        console.log(Response);
        resolve(Response);
      },
      fail(err) {
        console.error('&&&&', err);
        resolve(err);
      },
    });
  });
}

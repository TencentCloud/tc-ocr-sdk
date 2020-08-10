const tencentcloud = require("tencentcloud-sdk-nodejs");

// 导入sts产品模块的client models。
const StsClient = tencentcloud.sts.v20180813.Client;
const models = tencentcloud.sts.v20180813.Models;

const Credential = tencentcloud.common.Credential;

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
let cred = new Credential("secretId", "secretKey");

// 实例化sts产品的client对象
let client = new StsClient(cred, "ap-guangzhou");

// 实例化一个请求对象
let req = new models.GetFederationTokenRequest({
    "Name": "ocr",
    "DurationSeconds ": 30,
    "Policy": `{"version": "2.0", "statement": [{"action": ["ocr:*"], "resource": "*", "effect": "allow"}]}`
});

// 通过client对象调用GetFederationToken接口，需要传入请求对象以及响应回调函数
client.GetFederationToken(req, function (err, response) {
    // 请求异常返回，打印异常信息
    if (err) {
        console.log(err);
        return;
    }
    // 请求正常返回，打印response对象
    console.log(response);
});
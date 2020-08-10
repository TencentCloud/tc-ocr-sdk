## 临时密钥使用指导

### 概述

腾讯云官网的SecretId 和 SecretKey是属于您的重要财产。在使用OCR业务时需要利用SecretId 和 SecretKey去进行认证签名计算，但是如果将SecretId 和 SecretKey写死在SDK的代码当中存在极大的泄露风险。因此，我们在支持使用固定密钥的同时，提供了一种使用临时密钥的方式。SDK可以使用临时密钥进行认证签名计算，去请求OCR识别接口。兑换的临时密钥具有时效性，可以大大降低SecretId 和 SecretKey泄露的风险。

### 临时密钥兑换流程

#### 临时密钥兑换流程图如下所示:

![临时密钥兑换流程图](https://scan-1254418846.cos.ap-guangzhou.myqcloud.com/demo/scan-doc/image/ORCSDK/%E4%B8%B4%E6%97%B6%E5%AF%86%E9%92%A5%E5%85%91%E6%8D%A2%E7%9A%84%E6%B5%81%E7%A8%8B%E5%9B%BE.jpg)

如图所示临时密钥兑换的流程大致可描述为：

1. 用户的客户端主动请求用户的服务器端来获取临时密钥。
2. 用户的服务器接收到客户端请求后，将储存在服务器端的固定密钥作为参数去请求CAM服务，进行临时密钥兑换。
3. CAM服务下发临时密钥给用户服务器。
4. 用户服务器在接收到CAM服务生成的临时密钥以后，将此临时密钥下发到用户的客户端。
5. 客户端获取到服务器下发的临时密钥后，调用SDK提供的更新临时密钥的接口将临时密钥更新。然后客户端SDK会使用更新后的临时密钥，去请求OCR服务。

其中：

- CAM：[腾讯云访问管理](https://cloud.tencent.com/product/cam)，用于生成 OCR服务的临时密钥。

### SDK端工作

#### 1. 临时密钥模式 （推荐） 

后端通过获取临时密钥给到前端、终端计算签名。 您在与服务器端完成临时密钥兑换之后，调用客户端SDK的密钥刷新接口将获取的的临时密钥信息传入即可。SDK会在下一次调用OCR识别请求时，自动使用临时密钥去做认证签名计算。

##### 前端使用示例

```javascript
const axios = require('axios')

// 必选参数
async function getAuthorization (options, callback) {
  try{
    let res = await axios({
      method: 'post',
      url: '您服务器端的接口地址', // 填写您服务器端的接口地址，获取临时密钥
      data: {options}
    })
    let credentials = res.Credentials
    if (!res || !credentials) return console.error('credentials invalid')
    callback({
      TmpSecretId: credentials.TmpSecretId,
      TmpSecretKey: credentials.TmpSecretKey,
      Token: credentials.Token,
      ExpiredTime: res.ExpiredTime, // 临时证书有效的时间，返回 Unix 时间戳，精确到秒
      Expiration: res.Expiration, // 证书有效的时间，以 iso8601 格式的 UTC 时间表示
      RequestId: res.RequestId
    })
  }catch (err) {
    return console.error(`${err} error occurs`)
  }
}
```

##### Android端使用示例

```java
/**
 * 本地测试，兑换临时密钥的方法
 *
 * @param listener 结果监听的listener
 */
public void doUpdateTmpToken(final TmpTokenListener listener) {
    if (listener == null) {
        return;
    }
    Thread thread = new Thread(new Runnable() {
        @Override
        public void run() {
            // 您服务器端的接口地址
            String url = "您服务器端的接口地址";
            // 构造请求参数
            try {
              	// 构造您的请求参数，请求参数完全可以按照您的需求传入
                String param = crateParam();
                // 发送请求到服务端，通知服务端访问CAM服务器去兑换临时密钥。
                NetWorkConnectUtil.postToUrl(url, param, new NetWorkConnectUtil.NetWorkListener() {
                    @Override
                    public void onSuccess(String result) {
                        // 处理服务器端的返回结果，并解析结果，更新tmpSecretId, tmpSecretKey, tmpToken的值
                        if (parseValue(result)) {
                            // 将最新获得的密钥信息，通过回调返回到调用的地方，可在调用处主动刷新临时密钥到SDK
                            listener.onSuccess(tmpSecretId, tmpSecretKey, tmpToken);
                        } else {
                            listener.onError(ERROR_CODE_PARSE, "parseValue error!");
                        }
                    }

                    @Override
                    public void onError(int errorCode, String errorMsg) {
                        listener.onError(errorCode, errorMsg);
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    });
    thread.start();
}
```

[更多详细示例请参考示例代码](https://github.com/TencentCloud/tc-ocr-sdk/tree/master/%E4%B8%B4%E6%97%B6%E5%AF%86%E9%92%A5%E5%85%91%E6%8D%A2/examples/Android)

##### iOS端使用示例

```objective-c
///获取临时秘钥方法
- (void) doUpdateTmpToken {
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    manager.requestSerializer = [AFJSONRequestSerializer serializer];
    [manager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [manager.requestSerializer setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    
    NSMutableDictionary *param = [NSMutableDictionary dictionary];
    NSString *sdkVersion = [[OcrSDKKit sharedInstance] sdkVersion];
    [param setObject:sdkVersion forKey:@"sdkVersion"];
    [param setObject:[self currentDateStr] forKey:@"Timestamp"];
    [param setObject:[[UIDevice currentDevice] name] forKey:@"Model"];
    [param setObject:[[UIDevice currentDevice] systemVersion] forKey:@"OSVersion"];
    [param setObject:[self uuidString] forKey:@"uuid"];
    
    NSString *request = [JsonUtil convertToJsonData:param];
  	/// AES 传参加密
    NSString *encodeRequest = [AesUtil AES128EncryptWithContent:request Key:ENCODE_KEY iv:ENCODE_IV];
    [param removeAllObjects];
    [param setObject:encodeRequest forKey:@"request"];
    [manager POST:POST_URL parameters:param progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        NSLog(@"%@",responseObject);
        NSNumber *stateCode = [responseObject objectForKey:@"statusCode"];
        NSString *message = [responseObject objectForKey:@"message"];
        if ([stateCode longValue] != 0) {
            NSLog(@"net err %@",message);
        }
        NSString *data = [responseObject objectForKey:@"data"];
      	/// AES 解密
        NSString *content = [AesUtil AES128DecryptWithContent:data Key:DECODE_KEY iv:DECODE_IV];
        
        NSDictionary *resultDict = [JsonUtil dictionaryWithJsonString:content];
        NSDictionary *credentials = [resultDict objectForKey:@"Credentials"];
        NSString *tempToken = [credentials objectForKey:@"Token"];
        NSString *tmpSecretId = [credentials objectForKey:@"TmpSecretId"];
        NSString *tmpSecretKey = [credentials objectForKey:@"TmpSecretKey"];
        
        NSLog(@"tempToken:%@\n tmpSecretId:%@\n tmpSecretKey:%@",tempToken,tmpSecretId,tmpSecretKey);
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        NSLog(@"%@",error.userInfo);
    }];
}
```

[更多详细示例请参考示例代码](https://github.com/TencentCloud/tc-ocr-sdk/tree/master/%E4%B8%B4%E6%97%B6%E5%AF%86%E9%92%A5%E5%85%91%E6%8D%A2/examples/iOS)

#### 2. 固定密钥模式  

同时支持固定密钥模式，前端、Android端、iOS端在初始化时可以直接传入固定密钥或者临时密钥。如果需要更新临时密钥，需要调用客户端SDK的刷新接口传入临时密钥。 该格式适用于前端调试，若使用此模式，请避免泄露密钥。 

##### 前端用法

```javascript
const tencentcloud = require("tencentcloud-sdk-nodejs");
// 导入sts产品模块的client models。
const OcrClient = tencentcloud.ocr.v20181119.Client;
const models = tencentcloud.ocr.v20181119.Models;
const Credential = tencentcloud.common.Credential;
// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
let credential = new Credential("secretId", "secretKey");
// 实例化ocr产品的client对象
let client = new OcrClient(credential, "ap-guangzhou");
```

##### Android端用法

```java
/**
 * 固定密钥存放封装类
 */
public class SecretPamera {
    /**
     * 固定密钥信息
     */
    public final static String secretId = "SECRET_ID_ANDROID";
    /**
     * 固定密钥的key值
     */
    public final static String secretKey = "SECRET_KEY_ANDROID";
}
```

##### iOS端用法

```objective-c
static NSString *secretId = @"SECRET_ID_iOS";
static NSString *secretKey = @"SECRET_KEY_iOS";
```

### 服务器端工作

腾讯云访问管理CAM服务会生成临时密钥。用户在服务器端使用腾讯云API发送请求，调用CAM获取联合身份临时访问凭证接口，来获取临时密钥。然后返回临时密钥给客户端APP。详细文档可参考[获取联合身份临时访问凭证]( https://cloud.tencent.com/document/product/598/33416 )。 

#### 1. 服务器端获取临时密钥示例代码

[Nodejs示例代码](https://github.com/TencentCloud/tc-ocr-sdk/tree/master/%E4%B8%B4%E6%97%B6%E5%AF%86%E9%92%A5%E5%85%91%E6%8D%A2/examples/Nodejs)

[Go示例代码](https://github.com/TencentCloud/tc-ocr-sdk/tree/master/%E4%B8%B4%E6%97%B6%E5%AF%86%E9%92%A5%E5%85%91%E6%8D%A2/examples/Go)

其他语言的示例代码可以参考云API 3.0，云 API 3.0 提供了配套的开发工具集（SDK），支持多种编程语言，能更方便的调用 API。

- [Tencent Cloud SDK 3.0 for Python](https://github.com/TencentCloud/tencentcloud-sdk-python)
- [Tencent Cloud SDK 3.0 for Java](https://github.com/TencentCloud/tencentcloud-sdk-java)
- [Tencent Cloud SDK 3.0 for PHP](https://github.com/TencentCloud/tencentcloud-sdk-php)
- [Tencent Cloud SDK 3.0 for Go](https://github.com/TencentCloud/tencentcloud-sdk-go)
- [Tencent Cloud SDK 3.0 for NodeJS](https://github.com/TencentCloud/tencentcloud-sdk-nodejs)
- [Tencent Cloud SDK 3.0 for .NET](https://github.com/TencentCloud/tencentcloud-sdk-dotnet)

#### 2. 获取临时密钥请求响应示例

授权该临时证书具有以下权限： `{"version": "2.0", "statement": [{"action": ["ocr:*"], "resource": "*", "effect": "allow"}]}`

注意，因为GET请求需要给所有参数做urlencode，所以下面示例中的Policy参数是做了两次urlencode的结果。

##### 输入示例

```xml
https://sts.tencentcloudapi.com/?Action=GetFederationToken
&Name=ocr
&Policy=请求入参
&DurationSeconds=120
```

##### 输出示例

```json
{
"ExpiredTime": 1595221362,
"Expiration": "2020-07-20T05:02:42Z",
"Credentials": {
    "Token": "临时Token",
    "TmpSecretId": "临时TmpSecretId",
    "TmpSecretKey": "临时TmpSecretKey"
},
"RequestId": "返回的RequestId"
}
```

#### 3. 请求参数说明

以下请求参数列表列出了获取临时密钥接口的请求参数。

| 参数名称        | 必选 | 类型    | 描述                                                         |
| :-------------- | :--- | :------ | :----------------------------------------------------------- |
| Name            | 是   | String  | 自定义调用方英文名称，本接口取值：ocr。                      |
| Policy          | 是   | String  | 授予该临时证书权限的CAM策略，本接口取值：`{"version": "2.0", "statement": [{"action": ["ocr:*"], "resource": "*", "effect": "allow"}]}` |
| DurationSeconds | 否   | Integer | 指定临时证书的有效期，单位：秒，默认1800秒，最长可设定有效期为7200秒。 |
| secretId        | 是   | String  | 云 API 密钥 Id                                               |
| secretKey       | 是   | String  | 云 API 密钥 Key                                              |

#### 4. 输出参数说明

| 参数名称       | 类型    | 描述                                                         |
| :------------- | :------ | :----------------------------------------------------------- |
| ExpiredTime    | Integer | 临时证书有效的时间，返回 Unix 时间戳，精确到秒               |
| Expiration     | String  | 证书有效的时间，以 iso8601 格式的 UTC 时间表示 注意：此字段可能返回 null，表示取不到有效值。 |
| RequestId      | String  | 唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。 |
| Credentials    | Object  | 返回的临时密钥内容                                           |
| - Token        | String  | 请求时需要用的 token 字符串                                  |
| - TmpSecretId  | String  | 临时密钥 Id，可用于计算签名                                  |
| - TmpSecretKey | String  | 临时密钥 Key，可用于计算签名                                 |
## 一分钟跑通Demo(iOS)

本文主要介绍如何快速运行腾讯云 文字识别 OCR Demo。



### 环境要求

- 兼容iOS9.0 及以上版本的IOS系统
- 开发工具使用Xcode11.0或以上版本，推荐使用Xcode 11.5
- 建议使用iphone真机体验



### 前提条件

- 您已 [注册腾讯云](https://cloud.tencent.com/document/product/378/17985) 账号，并完成 [实名认证](https://cloud.tencent.com/document/product/378/3629)。
- 进入 [文字识别控制台](https://console.cloud.tencent.com/ocr/general)，即可开通相应服务，并在[账号中心](https://console.cloud.tencent.com/cam/capi) 获取API秘钥。
- 并将SDK的demo文件下载到本地。



### 操作步骤

#### 步骤1：导入工程

进入下载的Demo文件夹，双击使用Xcdoe打开项目工程

![](https://scan-1254418846.cos.ap-guangzhou.myqcloud.com/demo/scan-doc/image/ORCSDK/iOS%E5%BC%80%E5%90%AFDemo%E5%B7%A5%E7%A8%8B.png)

#### 步骤2：若使用真机调试，配置您的苹果开发者账号

TARGETS -> Signing$Capabilities ->Signing 设置

#### 步骤3: 修改配置信息

修改项目中的SecretId SecretKey 值，填入您在腾讯云控制台的API秘钥。

```objective-c
//正式 
static NSString *SECRET_ID = @"A**********************";
static NSString *SECRET_KEY = @"e*********************";
```

> ⚠️**注意**
>
> 本文提到的将secretId、secretKey直接配置到客户端中的方式，很容易被反编译逆向破解，一旦您的密钥泄密，攻击者可以使用您的secretId、secretKey信息进行OCR识别请求，给您造成损失。因此该方法**仅适用于本地跑通Demo和功能调试**
>
> 我们建议您将secretId、secretKey配置到服务器端，同时客户端使用临时密钥兑换的方式进行OCR识别。具体流程可以参考[临时密钥兑换流程](https://github.com/TencentCloud/tc-ocr-sdk/tree/master/%E4%B8%B4%E6%97%B6%E5%AF%86%E9%92%A5%E5%85%91%E6%8D%A2)。



#### 步骤3:编译运行

完成配置之后，选择您的运行机器(模拟器&真机)。(tips:真机才能体验摄像头拍照识别功能的)。
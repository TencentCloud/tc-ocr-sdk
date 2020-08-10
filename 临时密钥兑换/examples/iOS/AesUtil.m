//
//  AesUtil.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "AesUtil.h"
#import "NSData+AES.h"


@implementation AesUtil
/// 加密
+ (NSString *)AES128EncryptWithContent:(NSString *)content Key:(NSString *)key iv:(NSString *)iv {
    NSData *contentData = [content dataUsingEncoding:NSUTF8StringEncoding];
    //加密
    NSData *enAESData = [contentData AES128EncryptWithKey:ENCODE_KEY iv:ENCODE_IV];
    NSData *enDase64Data = [enAESData base64EncodedDataWithOptions:0];
    NSString *encodeStr = [AesUtil dataToHexFun: enDase64Data];
    return encodeStr;
}


/// 解密
+ (NSString *)AES128DecryptWithContent:(NSString *)content Key:(NSString *)key iv:(NSString *)iv {
    NSData *decodeData = [AesUtil hexToDataFun:content];
    NSData *decodeBase64Data = [[NSData alloc] initWithBase64EncodedData:decodeData options:0];
    NSData *decodeDataResult = [decodeBase64Data AES128DecryptWithKey:DECODE_KEY iv:DECODE_IV];
    NSString *decodeStr = [[NSString alloc] initWithData:decodeDataResult encoding:NSUTF8StringEncoding];
    return decodeStr;
}


+ (NSString *) dataToHexFun:(NSData *)hmacData{
    const unsigned char *buffer = (const unsigned char *)[hmacData bytes];
    NSMutableString *HMAC = [NSMutableString stringWithCapacity:hmacData.length * 2];
    for (int i = 0; i < hmacData.length; ++i){
        [HMAC appendFormat:@"%02x", buffer[i]];
    }
    return HMAC;
}

+ (NSData *) hexToDataFun:(NSString *)str {
    if (!str || [str length] == 0) {
        return nil;
    }
    NSMutableData *hexData = [[NSMutableData alloc] initWithCapacity:20];
    NSRange range;
    if ([str length] % 2 == 0) {
        range = NSMakeRange(0, 2);
    } else {
        range = NSMakeRange(0, 1);
    }
    for (NSInteger i = range.location; i < [str length]; i += 2) {
        unsigned int anInt;
        NSString *hexCharStr = [str substringWithRange:range];
        NSScanner *scanner = [[NSScanner alloc] initWithString:hexCharStr];
        
        [scanner scanHexInt:&anInt];
        NSData *entity = [[NSData alloc] initWithBytes:&anInt length:1];
        [hexData appendData:entity];
        
        range.location += range.length;
        range.length = 2;
    }
    return hexData;
}

@end

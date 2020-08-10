//
//  AesUtil.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

static NSString *ENCODE_KEY = @"";
static NSString *DECODE_KEY = @"";
static NSString *ENCODE_IV = @"";
static NSString *DECODE_IV = @"";

@interface AesUtil : NSObject

+ (NSString *)AES128EncryptWithContent:(NSString *)content Key:(NSString *)key iv:(NSString *)iv;
+ (NSString *)AES128DecryptWithContent:(NSString *)content Key:(NSString *)key iv:(NSString *)iv;

@end

NS_ASSUME_NONNULL_END

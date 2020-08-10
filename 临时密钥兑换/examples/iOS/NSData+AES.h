//
//  NSData+AES.h
//  sigtrue
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSData (AES)
//加密
- (NSData *)AES128EncryptWithKey:(NSString *)key iv:(NSString *)iv;

//解密
- (NSData *)AES128DecryptWithKey:(NSString *)key iv:(NSString *)iv;
@end

NS_ASSUME_NONNULL_END

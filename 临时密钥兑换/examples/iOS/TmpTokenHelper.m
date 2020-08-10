//
//  TmpTokenHelper.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "TmpTokenHelper.h"
#import <AFNetworking.h>
#import <OcrSDKKit/OcrSDKKit.h>
#import "JsonUtil.h"
#import "AesUtil.h"

static NSString *POST_URL = @"您服务器端的接口地址";
@implementation TmpTokenHelper

/// 获取临时秘钥方法
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

//获取当前时间
- (NSString *)currentDateStr{
    NSDate *currentDate = [NSDate date];//获取当前时间，日期
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"YYYY/MM/dd hh:mm:ss SS "];
    NSString *dateString = [dateFormatter stringFromDate:currentDate];
    return dateString;
}

- (NSString *)uuidString{
    CFUUIDRef uuid_ref = CFUUIDCreate(NULL);
    CFStringRef uuid_string_ref= CFUUIDCreateString(NULL, uuid_ref);
    NSString *uuid = [NSString stringWithString:(__bridge NSString *)uuid_string_ref];
    CFRelease(uuid_ref);
    CFRelease(uuid_string_ref);
    //去除UUID ”-“
    NSString *UUID = [[uuid lowercaseString] stringByReplacingOccurrencesOfString:@"-" withString:@""];
    NSLog(@"%@", UUID);
    return UUID;
}

@end

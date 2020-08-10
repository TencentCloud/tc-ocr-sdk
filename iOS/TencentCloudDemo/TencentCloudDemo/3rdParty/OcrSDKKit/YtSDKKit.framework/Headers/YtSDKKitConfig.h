//
//  YtSDKKitConfig.h
//  yt-ios-verification-sdk
//
//  Created by Marx Wang on 2019/9/16.
//  Copyright © 2019 Tencent.Youtu. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "YtSDKCommonDefines.h"

/// SDKKIt配置帮助类
/// 为SDKKit相关配置提供加载，更新，查看等支持
YT_SDK_EXPORT @interface YtSDKKitConfig : NSObject

/// SDKKIt配置单例获取接口
+ (instancetype)sharedInstance;
/// SDKKIt配置单例释放接口
+ (void)clearInstance;

/// SDKKIt配置加载接口
/// @param sdkConfig SDK配置内容，json数据类型
/// @param uiConfig UI配置内容，json数据类型
- (int)loadSDKConfigWith:(NSString *)sdkConfig withUIConfig:(NSString *)uiConfig;

/// 判断是否有效加载配置项
- (BOOL)validateConfigData;

/// 根据传入工作模式获取UI配置信息，改动此配置信息可以影响下次加载SDKKIt框架时运行的内容
/// @param mode SDKKIt工作模式
- (NSDictionary *)getUIConfigBy:(YtSDKKitMode)mode;

/// 根据传入工作模式获取SDK配置信息，改动此配置信息可以影响下次加载SDKKIt框架时运行的内容
/// @param mode SDKKIt工作模式
- (NSDictionary *)getSDKConfigBy:(YtSDKKitMode)mode;

/// 获取该工作模式下依赖的状态机列表
/// @param mode SDKKit工作模式
- (NSMutableArray *)getStateNameArrayBy:(YtSDKKitMode)mode;

- (id)getConfigData:(id)configData withKey:(NSString *)key withRequired:(BOOL)required;
@end

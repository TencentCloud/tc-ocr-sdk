//
//  YtFSMState.h
//  yt-ios-verification-sdk
//
//  Created by Marx Wang on 2019/9/6.
//  Copyright © 2019 Tencent.Youtu. All rights reserved.
//
#pragma once
#import <Foundation/Foundation.h>
#import "YtSDKCommonDefines.h"
#ifdef YT_TINY_CV
#define custom_cv tiny_cv
#else
#define custom_cv cv
#endif
namespace custom_cv {
    class Mat;
}
typedef void (^OnFirstEntryBlock)();
YT_SDK_EXPORT @interface BaseState : NSObject
{
    
}

- (void)loadWithName:(NSString *)name withSDKConfigData:(id)configData;
- (void)unload;
- (void)enter;
- (void)exit;
- (void)reset;
- (void)moveToNextState;
- (void)onPause;
- (void)onResume;
- (void)handleEvent:(NSDictionary *)event;
- (void)update:(custom_cv::Mat) data;
- (void)handleInnerAction:(NSString *)actionName data:(id)data;
@property (nonatomic, strong) NSString *stateName;
@property (nonatomic, strong) NSMutableDictionary* stateData;
@property (nonatomic, copy) OnFirstEntryBlock firstEntryBlock;
@end

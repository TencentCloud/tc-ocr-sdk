//
//  YtFSM.h
//  yt-ios-verification-sdk
//
//  Created by Marx Wang on 2019/9/5.
//  Copyright © 2019 Tencent.Youtu. All rights reserved.
//
#pragma once
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#ifdef YT_TINY_CV
#define custom_cv tiny_cv
#else
#define custom_cv cv
#endif

#import "YtFSMState.h"
#import "YtSDKCommonDefines.h"
#import "YtSDKKitFramework.h"
namespace custom_cv {
    class Mat;
}
@interface StateMachine : NSObject
{
    
}
@property (nonatomic, copy) OnYtFrameworkEventBlock onEventBlock;
@property (nonatomic, copy) OnYtFrameworkEvenBestFrameBlock onBestImageBlock;
@property (nonatomic, copy) OnFrameworkEvenTimeOutBlock onTimesOutBlock;
@property (nonatomic, assign) YtSDKKitMode workMode;
@property (nonatomic, assign) id<YtDeviceDelegate> cameraDevice;
@property (nonatomic, assign) float currentFrameLux;
@property (nonatomic, strong) UIView *shapeView;
@property (nonatomic, copy) OnYtNetworkRequestBlock onRequestBlock;

+ (instancetype)sharedInstance;
+ (void)clearInstance;
- (void)start:(NSString*) firstStateName;
- (void)stop;
- (void)reset;
- (void)update:(custom_cv::Mat)data;
- (void)handleEvent:(NSDictionary *)event;
- (void)handlePause;
- (void)handleResume;
- (void)registerState:(BaseState *)state;
- (void)transitNow:(NSString*) nextStateName;
- (void)transitNextRound:(NSString*)nextStateName;
- (BaseState *)getStateByName:(NSString *)stateName;

- (void)sendUIEvent:(NSDictionary *)eventData;
- (void)sendStateEvent:(NSDictionary *)eventData;
- (void)sendCameraEvent:(NSDictionary *)eventData;
- (void)sendBestFrame:(NSString *)bestFrame;
- (void)sendTimeOut;

- (BOOL)isRunning;

@end

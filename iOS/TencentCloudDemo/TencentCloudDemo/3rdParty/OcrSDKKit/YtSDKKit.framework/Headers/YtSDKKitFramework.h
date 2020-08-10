//
//  YtSDKKitFramework.h
//  yt-ios-verification-sdk
//
//  Created by Marx Wang on 2019/9/5.
//  Copyright © 2019 Tencent.Youtu. All rights reserved.
//
#pragma once
#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <UIKit/UIKit.h>
#import "YtSDKCommonDefines.h"
#import "YtSDKKitConfig.h"
#import "StateNameList.h"
/// 反光模块依赖的硬件信息回调接口，需要返回当前摄像机设备信息
@protocol YtDeviceDelegate <NSObject>
/// 获取当前摄像机设备信息
- (AVCaptureDevice * _Nullable)getCaptureDevice;
/// 获取当前设备session信息
- (AVCaptureSession * _Nullable)getCaptureSession;
/// 设置反光屏幕变色消息通知
/// @param argb 色彩变化
/// @param light 光线变化
- (void)onReflectEventWithArgb:(uint)argb withLight:(CGFloat)light;
@end

/// SDKKit触发类型
typedef enum:NSUInteger {
    /// 触发活体开启事件
    TriggerBeginLiveness = 0,
    /// 触发活体结束事件
    TriggerCancelLiveness
}YtFrameworkFireEventType;

/// SDKKit底层基础框架类
/// 提供各个模块的状态管理，以及整个SDKKit的生命周期管理
YT_SDK_EXPORT @interface YtSDKKitFramework : NSObject
{
}

/// 配置待比对的Image图片
@property (nonatomic, strong) UIImage * _Nullable compareImage;
/// 配置待比对的Image图片类型（0普通，1网纹，默认0）
@property (nonatomic, assign) int compareImageType;
/// 反光颜色变化UI界面(需要设置才会生效）
@property (nonatomic, strong) UIView * _Nullable shapeView;
/// 设置预览视频大小区域
@property (nonatomic, assign) CGRect previewRect;
/// 设置检测人脸区域
@property (nonatomic, assign) CGRect detectRect;
/// 设置模型根目录，如果不设置自动读取app根路径下模型
@property (nonatomic, strong) NSString * _Nullable modelRootPath;
/// 设置网络请求超时，默认60000ms
@property (nonatomic, assign) int networkTimeoutMs;
/// SDKKIt框架单例获取接口
+ (instancetype _Nonnull)sharedInstance;
/// SDKKit框架单例释放接口
+ (void)clearInstance;
/// SDKKit框架版本获取接口
/// @return 当前版本信息
- (NSString *_Nonnull)getVersion;

/// SDKKit 框架初始化函数 一般对于一种场景都需要调用此函数做为开始
/// @param jsonData SDK配置参数
/// @param workMode 场景需要工作的模式
/// @param stateNameArray 该场景所依赖的状态机列表（一般可以通过YtSDKKItConfig getStateNameArrayBy来获取已有的状态机列表
/// @param camera 如果使用反光模块，请传入带有YtDeviceDelegate协议的j对象，否则可以传传入nil
/// @param onEventHandleBlock SDKKit框架跑出来的事件（UI事件，状态事件等），用来处理UI变化以及识别事件
/// @param onEventBestFrameBlock SDKKit 返回摄像头最佳桢数据
/// @param onFrameworkEvenTimeOutBlock SDKKit 自动识别超时回调
/// @return 返回错误信息
/**
 | 错误码 | 说明  |
 | ----: | :---- |
 | 0   | 成功 |
 | -1 | stateNameArray 大小不能为0  |
 | -2 | EventBlock 不能为nil |
 | -3 | camera对象不能为nil |
 | -4 | 无法正常调用优图提供的afnetwork库符号 |
**/
- (int)initWithSDKSetting: (NSDictionary * _Nonnull)jsonData
     withPipelineWorkMode: (YtSDKKitMode)workMode
withPipelineStateNameArray:(NSArray * _Nonnull)stateNameArray
               withCamera: (id<YtDeviceDelegate> _Nullable)camera
     withEventHandleBlock: (OnYtFrameworkEventBlock _Nonnull)onEventHandleBlock
  withEventBestFrameBlock: (OnYtFrameworkEvenBestFrameBlock _Nonnull)onEventBestFrameBlock
   withEventTimesOutBlock:(OnFrameworkEvenTimeOutBlock _Nonnull)onFrameworkEvenTimeOutBlock;
/// SDKKit框架资源释放接口
/// @return 0 成功
- (int)deInit;

/// SDKKit框架重置接口
/// 可以不用释放模型或者重新加载库，直接重置pipeline流程，一般用于多次执行pipeline获取最优结果
- (void)reset;

/// 每帧调用接口，针对不同场景用来处理视频帧数据
/// @param imageData 视频帧数据，一般可以通过CameraDevice回调获取
- (int)updateWithFrameData:(CMSampleBufferRef _Nonnull)imageData;
/// 在手动活体触发模式下，可以调用该接口，手动启动活体检测和退出活体检测功能
/// @param eventType 事件类型
/// @param content 事件内容（一般为nil）
- (void)fireEvent:(YtFrameworkFireEventType)eventType withContent:(id _Nullable)content;

/// 进入暂停生命周期时调用
- (void)doPause;

/// 进入恢复生命周期时调用
- (void)doResume;

@end


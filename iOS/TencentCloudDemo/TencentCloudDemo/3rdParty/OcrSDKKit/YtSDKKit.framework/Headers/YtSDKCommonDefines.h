//
//  YtSDKCommonDefines.h
//  yt-ios-face-recognition-demo
//
//  Created by Marx Wang on 2019/9/11.
//  Copyright © 2019 Tencent.Youtu. All rights reserved.
//

#ifndef YT_SDKKIT_COMMON_DEFINES_H
#define YT_SDKKIT_COMMON_DEFINES_H

#define YT_SDK_EXPORT __attribute__((visibility("default")))

/// YtSDKKit日志等级
typedef NS_ENUM(NSInteger, YtSDKLogLevelType)
{
    YT_SDK_ERROR = 0,
    YT_SDK_WARN,
    YT_SDK_INFO,
    YT_SDK_DEBUG
};
/// YtSDKKit工作模式
typedef NS_ENUM(NSInteger, YtSDKKitMode)
{
    /// OCR识别模式（包含身份证和银行卡）
    YT_SDK_OCR_MODE = 0,
    /// 静默核身模式
    YT_SDK_SILENT_MODE,
    /// 动作核身模式
    YT_SDK_ACTION_MODE,
    /// 反光核身模式
    YT_SDK_REFLECT_MODE,
    /// 动作反光核身模式
    YT_SDK_ACTREFLECT_MODE,
    /// 其他模式（暂不使用）
    YT_SDK_CUSTOM_MODE,
};
/// YtSDKKit框架底层事件类型
typedef NS_ENUM(NSInteger, YtFrameworkEventType)
{
    /// UI事件类型
    YT_SDK_UI_FEVENT_TYPE,
    /// 状态事件类型
    YT_SDK_STATE_FEVENT_TYPE,
    /// @deprecated 相机事件类型（暂不使用）
    YT_SDK_CAMERA_FEVENT_TYPE,
};
/// 网络回包回调接口
/// @param result 如果没有任何异常，则将回包信息放入result数据结构中
/// @param error 如果有异常，则传入异常结果
typedef void (^OnYtNetworkResponseBlock)(NSDictionary *result, NSError *error);
/// 网络请求回调接口
/// 该接口需要实现网络请求功能
/// @param url 请求url地址
/// @param request 请求body内容
/// @param headers 请求headers内容
/// @param response 回包回调接口
typedef void (^OnYtNetworkRequestBlock)(NSString *url, NSString *request, NSDictionary *headers, OnYtNetworkResponseBlock response);
/// SDKKit框架底层事件回调接口
/// 用于处理底层抛上来的事件信息
/// @param eventType 事件类型
/// @param eventDict 事件内容
typedef void (^OnYtFrameworkEventBlock)(YtFrameworkEventType eventType, NSDictionary *eventDict);

typedef void (^OnYtFrameworkEvenBestFrameBlock)(NSString *bestFrameImage);

typedef void (^OnFrameworkEvenTimeOutBlock)(void);

#define YtSDKLogLevelUserDefaultsDomain @"com.tencent.youtusdk.userdefaults.showlog.level"

#define YtSDKErrorDomain @"com.tencent.youtusdk.error"
/// YtSDKKIt错误类型
typedef NS_ENUM(NSInteger,YTSDKitError) {
    // 授权失败
    YT_SDK_AUTH_FAILED_CODE                  = 100000,
    // 识别失败
    YT_SDK_RECOGNIZE_FAILED_CODE             = 101000,
    // 参数异常
    YT_SDK_PARAMETER_ERROR_CODE              = 100100,
    // 内部鉴权异常
    YT_SDK_AUTH_ERROR_CODE                   = 100101,
    // 网络异常
    YT_SDK_NETWORK_ERROR_CODE                = 100102,
    // 摄像头权限异常
    YT_SDK_CAMEREA_PERMISSION_ERROR_CODE     = 100103,
    // 用户手动取消
    YT_SDK_USER_CANCEL_CODE                  = 200101,
    // 识别失败-初始化异常
    YT_SDK_VERIFY_MODEL_INIT_FAIL            = 300101,
    // 识别失败-服务解析异常
    YT_SDK_VERIFY_SERVER_FAIL                = 300102,
    // 识别失败-分数过低
    YT_SDK_VERIFY_SCORE_TOO_LOW              = 300103,
    // 识别失败-超时
    YT_SDK_VERIFY_TIMEOUT                    = 300104,
    // 识别失败-人脸问题
    YT_SDK_VERIFY_FACE_ERROR                 = 300105,
};

#define YtSDKAuthFailed @"yt_auth_failed"
#define YtSDKRecognizeFailed @"yt_verify_failed"
#define YtSDKParameterError @"yt_param_error"
#define YtSDKNetworkError @"yt_network_error"
#define YtSDKCameraPermissionError @"yt_camera_permission_error"
#define YtSDKUserCancel @"yt_user_cancel"


// Event defines
#define YtSDKEventTipsType @"com.tencent.youtusdk.tips"
#define YtSDKEventActionType @"com.tencent.youtusdk.action"
#define YtSDKEventErrorType @"com.tencent.youtusdk.error"
#define YtSDKEventUserInfoType @"com.tencent.youtusdk.userinfo"
#define YtSDKEventResultInfoType @"com.tencent.youtusdk.resultinfo"
#define YtSDKEventCmpInfoType @"com.tencent.youtusdk.cmpinfo"
#define YtSDKEventCmpScoreType @"com.tencent.youtusdk.cmpscore"
#define YtSDKEventPipelineSucceedFinished @"com.tencent.youtusdk.pipeline_succeedfinished"
#define YtSDKEventPipelineFailedFinished @"com.tencent.youtusdk.pipeline_failedfinished"
#define YtSDKEventPipelineFailedErrorCode @"com.tencent.youtusdk.pipeline_failederrorcode"


// Tips event value defines
// Basic
#define YtSDKTipValueRecogizeSucceed @"yt_verify_succeed"
#define YtSDKTipValueWait @"yt_net_wait"

#define YtSDKTipValueAdviseCloser @"yt_face_closer"
#define YtSDKTipValueAdviseFarer @"yt_face_farer"

// Ocr predetect
#define YtSDKTipValueOcrAutoDetectTimeout @"yt_ocr_auto_timeout"
#define YtSDKTipValueOcrManualDetectStarting @"yt_ocr_manual_on"
#define YtSDKTipValueOcrManualDetectFinished @"yt_ocr_manual_succeed"
#define YtSDKTipValueCardInRect @"yt_ocr_keep_card"
#define YtSDKTipValueCardNotDetect @"yt_ocr_no_card"
#define YtSDKTipValueCameraRefocus @"yt_cam_refocus"

// Action event value defines
#define YtSDKActValueRecPass @"com.tencent.youtusdk.rec_pass"
#define YtSDKActValueRecNotPass @"com.tencent.youtusdk.rec_notpass"
#define YtSDKActValueNotDetect @"com.tencent.youtusdk.not_detect"
#define YtSDKActValueTooBlur @"com.tencent.youtusdk.too_blur"
#define YtSDKActValueWaitNetworkResult @"com.tencent.youtusdk.wait_network_result"
#define YtSDKActValueCountDownBegin @"com.tencent.youtusdk.countdown_begin"
#define YtSDKActValueCountDownCancel @"com.tencent.youtusdk.countdown_cancel"
#define YtSDKActValueUIBrightnessUpdated @"com.tencent.youtusdk.ui_bright_updated"
#define YtSDKActValueUIBackgroundUpdated @"com.tencent.youtusdk.ui_bgcolor_updated"
#define YtSDKActValueStartOcrManualDetectMode @"com.tencent.youtusdk.on_ocr_manual_detect_mode"

#endif // YT_SDKKIT_COMMON_DEFINES_H

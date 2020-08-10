//
//  OcrSDKConfig.h
//  OcrSDKKit
//
//  Created by v_clvchen on 2020/7/17.
//  Copyright © 2020 tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "OcrSDKConfig.h"
#import "OcrCommDef.h"

NS_ASSUME_NONNULL_BEGIN
@interface OcrSDKConfig : NSObject
/// 识别模式
@property (nonatomic, assign) OcrModeType ocrModeType;
// TODU IDCard
/// 身份证照片裁剪（去掉证件外多余的边缘、自动矫正拍摄角度）
@property (nonatomic, assign) BOOL cropIdCard;
///人像照片裁剪（自动抠取身份证头像区域）
@property (nonatomic, assign) BOOL cropPortrait;
///复印件告警
@property (nonatomic, assign) BOOL copyWarn;
///边框和框内遮挡告警
@property (nonatomic, assign) BOOL borderCheckWarn;
/// 翻拍告警
@property (nonatomic, assign) BOOL reshootWarn;
/// PS检测告警
@property (nonatomic, assign) BOOL detectPsWarn;
/// 临时身份证告警
@property (nonatomic, assign) BOOL tempIdWarn;
/// 身份证有效日期不合法告警
@property (nonatomic, assign) BOOL invalidDateWarn;
/// 图片质量分数（评价图片的模糊程度）
@property (nonatomic, assign) BOOL quality;
/// 是否开启多卡证检测
@property (nonatomic, assign) BOOL multiCardDetect;

// TODU BusinessCardOCR
///图像预处理功能为，检测图片倾斜的角度，将原本倾斜的图片围绕中心点转正，最终输出一张正的名片抠图。
@property (nonatomic, strong) NSString *retImageType;


@property (nonatomic, strong) NSString *requset_opetion;

- (long) getAutoTimeoutms;

@end

NS_ASSUME_NONNULL_END

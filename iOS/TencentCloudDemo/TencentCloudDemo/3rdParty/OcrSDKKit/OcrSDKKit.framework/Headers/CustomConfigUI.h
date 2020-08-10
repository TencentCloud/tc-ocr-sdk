//
//  OcrSDKUIConfig.h
//  OcrSDKKit
//
//  Created by v_clvchen on 2020/7/27.
//  Copyright © 2020 tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface CustomConfigUI : NSObject

/// 是否显示dialog
@property (nonatomic, assign) BOOL isShowTips;

// 提醒的dialog信息文字内容
@property (nonatomic, strong) NSString *remindDialogText;
//提醒的dialog信息按钮颜色
@property (nonatomic, strong) UIColor *remindConfirmColor;

///卡片框选中颜色
@property (nonatomic, strong) UIColor *cardFrameColor;

///拍照按钮图标 80x80
@property (nonatomic, strong) UIImage *takePictureImage;
///打开手电筒按钮图标 40x40
@property (nonatomic, strong) UIImage *lightONImage;
///关闭手电筒按钮图标40x40
@property (nonatomic, strong) UIImage *lightOFFImage;
///相册按钮图标40x40
@property (nonatomic, strong) UIImage *albumImage;

@end

NS_ASSUME_NONNULL_END

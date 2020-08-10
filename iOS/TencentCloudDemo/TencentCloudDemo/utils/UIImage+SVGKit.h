//
//  UIImage+SVGKit.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIImage (SVGKit)


/// 单纯加载svg图片

/// @param name 图片名

/// @param imgv 显示的UIImageView

+(UIImage *)svgImageNamed:(NSString *)name imgv:(UIImageView *)imgv;

/// 加载svg图片，用16进制色值修改颜色

/// @param name 图片名

/// @param imgv 显示的UIImageView

/// @param hexColor 16进制色值

+(UIImage *)svgImageNamed:(NSString *)name imgv:(UIImageView *)imgv hexColor:(NSString *)hexColor;

/// 加载svg图片，用色值对象修改颜色

/// @param name 图片名

/// @param imgv 显示的UIImageView

/// @param objColor 色值对象

+(UIImage *)svgImageNamed:(NSString *)name imgv:(UIImageView *)imgv objColor:(UIColor *)objColor;

@end

NS_ASSUME_NONNULL_END

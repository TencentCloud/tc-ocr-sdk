//
//  UIImage+SVGKit.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "UIImage+SVGKit.h"
#import "SVGKImage.h"

@implementation UIImage (SVGKit)

+(UIImage *)svgImageNamed:(NSString *)name imgv:(UIImageView *)imgv{
    return [UIImage name:name imgv:imgv];
}

+(UIImage *)svgImageNamed:(NSString *)name imgv:(UIImageView *)imgv hexColor:(NSString *)hexColor{
    UIColor *tintColor = [UIImage colorWithHexString:hexColor];
    return [UIImage name:name imgv:imgv tintColor:tintColor];
}

+(UIImage *)svgImageNamed:(NSString *)name imgv:(UIImageView *)imgv objColor:(UIColor *)objColor{
    UIColor *tintColor = objColor;
    return [UIImage name:name imgv:imgv tintColor:tintColor];
}

#pragma mark - 加载svg图片统一调用此方法
+(UIImage *)name:(NSString *)name imgv:(UIImageView *)imgv{
    SVGKImage *svgImage = [SVGKImage imageNamed:name];
    svgImage.size = CGSizeMake(imgv.frame.size.width, imgv.frame.size.height);
    return svgImage.UIImage;
}

#pragma mark - 修改颜色统一调用此方法
+(UIImage *)name:(NSString *)name imgv:(UIImageView *)imgv tintColor:(UIColor *)tintColor{
    
    UIImage *svgImage = [UIImage name:name imgv:imgv];
    
    CGRect rect = CGRectMake(0, 0, svgImage.size.width, svgImage.size.height);
    CGImageAlphaInfo alphaInfo = CGImageGetAlphaInfo(svgImage.CGImage);
    BOOL opaque = alphaInfo == (kCGImageAlphaNoneSkipLast | kCGImageAlphaNoneSkipFirst | kCGImageAlphaNone);
    UIGraphicsBeginImageContextWithOptions(svgImage.size, opaque, svgImage.scale);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextTranslateCTM(context, 0, svgImage.size.height);
    CGContextScaleCTM(context, 1.0, -1.0);
    CGContextSetBlendMode(context, kCGBlendModeNormal);
    CGContextClipToMask(context, rect, svgImage.CGImage);
    
    CGContextSetFillColorWithColor(context, tintColor.CGColor);
    CGContextFillRect(context, rect);
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
    
}

#pragma mark - 16进制色值转化
+(UIColor *)colorWithHexString:(NSString *)color{
    
    NSString *cString = [[color stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] uppercaseString];
    
    
// String should be 6 or 8 characters

    if ([cString length] < 6) {
        return [UIColor clearColor];
    }
    
// 判断前缀

    if ([cString hasPrefix:@"0X"])
    cString = [cString substringFromIndex:2];
    if ([cString hasPrefix:@"#"])
    cString = [cString substringFromIndex:1];
    if ([cString length] != 6)
    return [UIColor clearColor];
    
// 从六位数值中找到RGB对应的位数并转换

    NSRange range;
    range.location = 0;
    range.length = 2;
    
//R、G、B

    NSString *rString = [cString substringWithRange:range];
    range.location = 2;
    NSString *gString = [cString substringWithRange:range];
    range.location = 4;
    NSString *bString = [cString substringWithRange:range];
    
// Scan values

    unsigned int r, g, b;
    [[NSScanner scannerWithString:rString] scanHexInt:&r];
    [[NSScanner scannerWithString:gString] scanHexInt:&g];
    [[NSScanner scannerWithString:bString] scanHexInt:&b];
    
    return [UIColor colorWithRed:((float) r / 255.0f)
                           green:((float) g / 255.0f)
                            blue:((float) b / 255.0f)
                           alpha:1.0f];
    
}

@end

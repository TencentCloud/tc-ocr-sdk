//
//  UIColorUtil.h
//  QBarCode
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIColorUtil : UIColor
+ (UIColor *)colorWithHexString:(NSString *)color;

+ (UIColor *)colorWithHex:(long)hexColor alpha:(float)opacity;

@end

NS_ASSUME_NONNULL_END

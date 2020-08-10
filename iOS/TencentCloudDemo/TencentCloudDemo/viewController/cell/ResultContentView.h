//
//  ResultContentCell.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ResultContentView : UIView
@property (weak, nonatomic) IBOutlet UILabel *resultTitleLabel;
@property (weak, nonatomic) IBOutlet UITextField *resultDescLabel;

@end

NS_ASSUME_NONNULL_END

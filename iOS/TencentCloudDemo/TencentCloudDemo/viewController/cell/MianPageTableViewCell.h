//
//  MianPageTableViewCell.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface MianPageTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UIView *shadowView;
@property (weak, nonatomic) IBOutlet UIImageView *modelIconImage;
@property (weak, nonatomic) IBOutlet UILabel *modelTitleLabel;
@property (weak, nonatomic) IBOutlet UILabel *modelDescLabel;

@end

NS_ASSUME_NONNULL_END

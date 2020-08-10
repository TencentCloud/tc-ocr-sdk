//
//  ResultTableViewCell.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ResultTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UILabel *title;
@property (weak, nonatomic) IBOutlet UITextField *content;

@end

NS_ASSUME_NONNULL_END

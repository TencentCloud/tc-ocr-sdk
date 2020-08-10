//
//  IdCardViewController.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

#define ScreenWidth  CGRectGetWidth([UIScreen mainScreen].bounds)
#define ScreenHeight CGRectGetHeight([UIScreen mainScreen].bounds)

@interface IdCardViewController : UIViewController
@property (weak, nonatomic) IBOutlet UIView *showContentView;
@property (weak, nonatomic) IBOutlet UIScrollView *resultScollView;
@property (weak, nonatomic) IBOutlet UITableView *idCardTableView;
@property (nonatomic, assign) int ocrModel; //1 自动识别卡片 0 手动拍摄
//@property ()
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *tableViewBottomConstraints;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *tableViewTopConstraints;
@property (weak, nonatomic) IBOutlet UILabel *resultOcrTipsLabel;

@end

NS_ASSUME_NONNULL_END

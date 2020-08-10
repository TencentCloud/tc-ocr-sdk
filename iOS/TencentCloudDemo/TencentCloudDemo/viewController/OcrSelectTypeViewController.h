//
//  OcrSelectTypeViewController.h
//  TencentOcrDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface OcrSelectTypeViewController : UIViewController
@property (weak, nonatomic) IBOutlet UITableView *selectTableView;
//@property (nonatomic, strong) NSString * ocrModel;
@property (nonatomic, assign) int ocrModel; //2 自动识别卡片 0 手动拍摄

@end

NS_ASSUME_NONNULL_END

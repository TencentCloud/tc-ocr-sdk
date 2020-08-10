//
//  ResultViewController.h
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "ViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface ResultViewController : ViewController
@property (weak, nonatomic) IBOutlet UIImageView *resultImageView;
@property (weak, nonatomic) IBOutlet UITableView *resultTableView;


@property (nonatomic, strong) NSDictionary *resultDict;
@property (nonatomic, strong) UIImage *resultImage;
@property (nonatomic, strong) NSString *cardType;

@end

NS_ASSUME_NONNULL_END

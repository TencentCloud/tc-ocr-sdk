//
//  OcrSelectTypeTableViewCell.h
//  TencentOcrDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface OcrSelectTypeTableViewCell : UITableViewCell
@property (weak, nonatomic) IBOutlet UIView *shadowView;
@property (weak, nonatomic) IBOutlet UIImageView *ocrTypeIconImage;
@property (weak, nonatomic) IBOutlet UILabel *ocrTypeTitleLabel;
@property (weak, nonatomic) IBOutlet UILabel *ocrTypeDescLabel;

@property (weak, nonatomic) IBOutlet UIButton *idCardStateIcon;


@end

NS_ASSUME_NONNULL_END

//
//  OcrSelectTypeTableViewCell.m
//  TencentOcrDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "OcrSelectTypeTableViewCell.h"

@implementation OcrSelectTypeTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    _shadowView.layer.shadowColor = [UIColor blackColor].CGColor;//shadowColor阴影颜色
    _shadowView.layer.shadowOffset = CGSizeMake(3,3);//shadowOffset阴影偏移,x向右偏移4，y向下偏移4，默认(0, -3),这个跟shadowRadius配合使用
    _shadowView.layer.shadowOpacity = 0.5;//阴影透明度，默认0
    _shadowView.layer.shadowRadius = 5;//阴影半径，默认3
      
    _shadowView.layer.cornerRadius = 8;//设置那个圆角大小
    
    _ocrTypeIconImage.contentMode = UIViewContentModeScaleAspectFit;

}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end

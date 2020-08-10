//
//  MianPageTableViewCell.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "MianPageTableViewCell.h"

@implementation MianPageTableViewCell

- (void)awakeFromNib {
    [super awakeFromNib];
    _shadowView.layer.shadowColor = [UIColor blackColor].CGColor;//shadowColor阴影颜色
    _shadowView.layer.shadowOffset = CGSizeMake(3,3);//shadowOffset阴影偏移,x向右偏移4，y向下偏移4，默认(0, -3),这个跟shadowRadius配合使用
    _shadowView.layer.shadowOpacity = 0.5;//阴影透明度，默认0
    _shadowView.layer.shadowRadius = 5;//阴影半径，默认3
    
    _shadowView.layer.cornerRadius = 8;//设置那个圆角大小

    //_shadowView.layer.masksToBounds = YES;//设置YES是保证添加的图片覆盖视图的效果
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

//- (void) setFrame:(CGRect)frame {
////    frame.origin.x = 20;//这里间距为10，可以根据自己的情况调整
////    frame.size.width -= 2 * frame.origin.x;
////    frame.size.height -= 2 * frame.origin.x;
////    [super setFrame:frame];
//}

@end

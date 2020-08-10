//
//  ResultContentCell.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "ResultContentView.h"

@implementation ResultContentView


- (instancetype)init
{
    self = [super init];
    if (self) {
        UINib *nib = [UINib nibWithNibName:@"ResultContentView" bundle:nil];
        self = [[nib instantiateWithOwner:nil options:nil] firstObject];
    }
    return self;
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
}

@end

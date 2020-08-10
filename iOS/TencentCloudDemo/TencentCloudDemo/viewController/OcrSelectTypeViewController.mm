//
//  OcrSelectTypeViewController.m
//  TencentOcrDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "OcrSelectTypeViewController.h"
#import "OcrSelectTypeTableViewCell.h"
#import "UIImage+SVGKit.h"
#import "IdCardViewController.h"
#import <OcrSDKKit/OcrSDKKit.h>
#import "ResultViewController.h"
#import <OcrSDKKit/OcrSDKConfig.h>

#import <MBProgressHUD.h>

///客户侧自己测试时的固定秘钥
static NSString *SECRET_ID = @"";
static NSString *SECRET_KEY = @"";


@interface OcrSelectTypeViewController ()<UITableViewDataSource, UITableViewDelegate>{
     NSArray *dataArr;
    
    OcrSDKKit *ocrSDKKit;
}
@property (nonatomic, strong) UIAlertController *alert;

@end

@implementation OcrSelectTypeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSString *title = self.ocrModel == 0 ? @"拍摄识别模式":@"自动识别模式";
    [self setTitle:title];
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    [self initDataSource];
    _selectTableView.bounces = YES;
    _selectTableView.alwaysBounceVertical = YES;
    _selectTableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    _selectTableView.dataSource = self;
    _selectTableView.delegate = self;
    [_selectTableView registerNib:[UINib nibWithNibName:@"OcrSelectTypeTableViewCell" bundle:nil] forCellReuseIdentifier:@"select_ocr_type_id"];
    
    ocrSDKKit = [OcrSDKKit sharedInstance];
    OcrSDKConfig *ocrSdkConfig = [[OcrSDKConfig alloc] init];
    OcrModeType selfOcrModel = _ocrModel == 0 ? OCR_DETECT_MANUAL :OCR_DETECT_AUTO_MANUAL;
    ocrSdkConfig.ocrModeType = selfOcrModel;
    [ocrSDKKit loadSDKConfigWithSecretId:SECRET_ID withSecretKey:SECRET_KEY withConfig:ocrSdkConfig];

}

- (void) initDataSource {
    if (dataArr == nil) {
        NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"ocrType" ofType:@"plist"];
        dataArr = [NSArray arrayWithContentsOfFile:plistPath];
    }
}

- (NSInteger) numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [dataArr count];
}

- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    OcrSelectTypeTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"select_ocr_type_id" forIndexPath:indexPath];
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    NSDictionary *tempDict = [dataArr objectAtIndex:indexPath.row];
    [cell.ocrTypeTitleLabel setText:tempDict[@"title"]];
    [cell.ocrTypeDescLabel setText:tempDict[@"typeDesc"]];
    
    NSString *iconName = tempDict[@"imageName"];
    [cell.ocrTypeIconImage setImage: [UIImage svgImageNamed:iconName imgv:cell.ocrTypeIconImage]];
    
    [cell.idCardStateIcon setHidden:YES];
    return cell;
}

- (void) tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
//    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    
    IdCardViewController *idCardViewController = [[IdCardViewController alloc] initWithNibName:NSStringFromClass([IdCardViewController class]) bundle:nil];
    idCardViewController.ocrModel = _ocrModel;
    switch (indexPath.row) {
        case 0:
            [self.navigationController pushViewController:idCardViewController animated:YES];
            break;
        case 1:
            [self startBankCardOcrProcess];
            break;
        case 2:
            [self startBusinessCardOcrProcess];
            break;
        default:
            NSLog(@"%ld",indexPath.row);
            break;
    }
}

//- (void) getTmpTokenAndKey:(NSInteger)index {
//    [MBProgressHUD showHUDAddedTo:self.view animated:YES];
//    [tmpTokenHelper doUpdateTmpTokenWithSuccess:^(id  _Nonnull resultInfo) {
//        NSDictionary *credentials = [resultInfo objectForKey:@"Credentials"];
//        NSString *tempToken = [credentials objectForKey:@"Token"];
//        NSString *tmpSecretId = [credentials objectForKey:@"TmpSecretId"];
//        NSString *tmpSecretKey = [credentials objectForKey:@"TmpSecretKey"];
//        [self->ocrSDKKit updateFederationToken:tmpSecretId withTempSecretKey:tmpSecretKey withToken:tempToken];
//
//        switch (index) {
//           case 1:
//               [self startBankCardOcrProcess];
//               break;
//           case 2:
//               [self startBusinessCardOcrProcess];
//               break;
//           default:
//               NSLog(@"%ld",index);
//               break;
//        }
//
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//    } Fail:^(NSError * _Nonnull error) {
//        NSLog(@"%@",error.userInfo);
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//    }];
//}


#pragma mark other Method
- (void)showAlert:(NSString *)title withMessage:(NSString*)message
{
    dispatch_time_t delayTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0/*延迟执行时间*/ * NSEC_PER_SEC));//延迟执行，可能当前viewController viewdidload还未执行完
    dispatch_after(delayTime, dispatch_get_main_queue(), ^{
        UIViewController * top= [UIApplication sharedApplication].keyWindow.rootViewController;
        self->_alert = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"好的" style:UIAlertActionStyleDefault
        handler:^(UIAlertAction * action) {}];
        [self->_alert addAction:defaultAction];
        [top presentViewController:self->_alert animated:NO completion:nil];
    });
}

- (void) startBankCardOcrProcess{
    CustomConfigUI *ocrSDKUIConfig = [[CustomConfigUI alloc] init];
    ocrSDKUIConfig.isShowTips = YES;
    ocrSDKUIConfig.remindConfirmColor = [UIColor magentaColor];
    [ocrSDKKit startProcessOcr:BankCardOCR withSDKUIConfig:ocrSDKUIConfig withProcessSucceedBlock:^(id  _Nonnull resultInfo, UIImage *resultImage, id  _Nonnull reserved) {
        ResultViewController *resultViewController = [[ResultViewController alloc] initWithNibName:NSStringFromClass([ResultViewController class]) bundle:nil];
        resultViewController.cardType = @"BankCard";
        resultViewController.resultImage = resultImage;
        resultViewController.resultDict = resultInfo;
        
        [self.navigationController pushViewController:resultViewController animated:YES];
    } withProcessFailedBlock:^(NSError * _Nonnull error, id  _Nullable reserved) {
        NSLog(@"requestId:%@",reserved);
        [self showAlert:error.domain withMessage:[error.userInfo objectForKey:NSLocalizedDescriptionKey]];
    }];
}

- (void) startBusinessCardOcrProcess {
    [ocrSDKKit startProcessOcr:BusinessCardOCR withSDKUIConfig:nil withProcessSucceedBlock:^(id  _Nonnull resultInfo, UIImage *resultImage, id  _Nonnull reserved) {
        ResultViewController *resultViewController = [[ResultViewController alloc] initWithNibName:NSStringFromClass([ResultViewController class]) bundle:nil];
        resultViewController.cardType = @"BusinessCard";
        resultViewController.resultImage = resultImage;
        resultViewController.resultDict = resultInfo;
        [self.navigationController pushViewController:resultViewController animated:YES];
    } withProcessFailedBlock:^(NSError * _Nonnull error, id  _Nullable reserved) {
        NSLog(@"requestId:%@",reserved);
        [self showAlert:error.domain withMessage:[error.userInfo objectForKey:NSLocalizedDescriptionKey]];
    }];
}

@end

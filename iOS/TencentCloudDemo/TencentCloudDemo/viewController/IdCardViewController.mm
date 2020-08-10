//
//  IdCardViewController.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "IdCardViewController.h"
#import "OcrSelectTypeTableViewCell.h"
#import "UIImage+SVGKit.h"
#import "ResultContentView.h"

#import <OcrSDKKit/OcrSDKKit.h>
#import <OcrSDKKit/OcrSDKConfig.h>

#import <MBProgressHUD.h>


static NSString *CELL_ID = @"id_card_cell_id";

///客户侧自己测试时的固定秘钥
static NSString *SECRET_ID = @"";
static NSString *SECRET_KEY = @"";
static const NSInteger INTERVAL_KEYBOARD = 5.0;

@interface IdCardViewController ()<UITableViewDelegate,UITableViewDataSource,UITextFieldDelegate>{
    NSArray *dataArr;
    NSMutableArray *resultImageArr;

    NSDictionary *frontDict;
    NSDictionary *backDict;
    
    OcrSDKKit *ocrSDKKit;
    
    int64_t currentIndex;
    CGFloat scrollContentOfsetY;
}
@property (nonatomic, strong) UIAlertController *alert;

@end

@implementation IdCardViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSString *title =  @"身份证";
    [self setTitle:title];
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
//    self.navigationController.navigationBar.topItem.title = @"";
    [self initDataSource];
    _idCardTableView.bounces = YES;
    _idCardTableView.alwaysBounceVertical = YES;
    _idCardTableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    _idCardTableView.dataSource = self;
    _idCardTableView.delegate = self;
    [_idCardTableView registerNib:[UINib nibWithNibName:@"OcrSelectTypeTableViewCell" bundle:nil] forCellReuseIdentifier:CELL_ID];
    /*！
     * OCR 配置类：
     * ocrModeType: 检测类型 0 手动拍摄 1 自动识别卡片
     */
    OcrSDKConfig *ocrSDKConfig = [[OcrSDKConfig alloc] init];
    OcrModeType selfOcrModel = _ocrModel == 0 ? OCR_DETECT_MANUAL :OCR_DETECT_AUTO_MANUAL;
    ocrSDKConfig.ocrModeType = selfOcrModel;
    ocrSDKConfig.copyWarn = YES;
    ocrSDKConfig.quality = YES;
    //测试可这里填入固定秘钥测试
    [ocrSDKKit loadSDKConfigWithSecretId:SECRET_ID withSecretKey:SECRET_KEY withConfig:ocrSDKConfig];
    
    resultImageArr = [NSMutableArray array];
    
    ocrSDKKit = [OcrSDKKit sharedInstance];
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(touchView2:)];
    [self.showContentView addGestureRecognizer:tap];
    
    [self addNoticeForKeyboard];
}

- (void)viewWillAppear:(BOOL)animated {
    int height = ScreenHeight;
    switch (height) {
        case 667:
            _tableViewTopConstraints.constant = 30;
            _tableViewBottomConstraints.constant = 300;
            break;
        case 736:
             _tableViewTopConstraints.constant = 70;
             _tableViewBottomConstraints.constant = 360;
             break;
        case 812:
            _tableViewTopConstraints.constant = 145;
            _tableViewBottomConstraints.constant = 375;
            break;

        default:
            break;
    }
    
}


- (void) addShowContentView {
    
    NSMutableDictionary *idCardInfoDict = [NSMutableDictionary dictionaryWithDictionary:frontDict];
    if (backDict != nil) {
        [idCardInfoDict setObject:[backDict objectForKey:@"ValidDate"] forKey:@"ValidDate"];
        [idCardInfoDict setObject:[backDict objectForKey:@"Authority"] forKey:@"Authority"];
        [idCardInfoDict setObject:[backDict objectForKey:@"RequestId"] forKey:@"BackRequestId"];
    }
    
    if (idCardInfoDict != nil) {
        [self.resultOcrTipsLabel setHidden:NO];
        NSArray *keyArr = [idCardInfoDict allKeys];
        for (int i= 0; i < [keyArr count]; i++) {
            ResultContentView *item = [[ResultContentView alloc] init];
            NSString *keyStr = [keyArr objectAtIndex:i];
            NSString *content = [idCardInfoDict objectForKey:keyStr];
            [item.resultTitleLabel setText: keyStr];
            [item.resultDescLabel setText: content];
            item.resultDescLabel.tag = i;
            [item.resultDescLabel addTarget:self action:@selector(textContentDidBegin:) forControlEvents:UIControlEventEditingDidBegin];
            item.resultDescLabel.returnKeyType = UIReturnKeyDone;
            item.resultDescLabel.delegate = self;//设置代理
            
            item.frame = CGRectMake(0, i * 44,[[UIScreen mainScreen] bounds].size.width, 44);
            [self.showContentView addSubview:item];
        }
    }
}


- (void) initDataSource {
    if (dataArr == nil) {
        NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"idCardType" ofType:@"plist"];
        dataArr = [NSArray arrayWithContentsOfFile:plistPath];
    }
}

- (NSInteger) numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 150;
}

- (NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [dataArr count];
}

- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    OcrSelectTypeTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CELL_ID forIndexPath:indexPath];
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    NSDictionary *tempDict = [dataArr objectAtIndex:indexPath.row];
    [cell.ocrTypeTitleLabel setText:tempDict[@"idCardTitle"]];
    [cell.ocrTypeDescLabel setText:tempDict[@"idCardDesc"]];
    
    NSString *iconName = tempDict[@"idCardIcon"];
    NSNumber *idCardState = tempDict[@"idCardState"];
    if ([idCardState intValue] == 0) {
        UIImage *tempImage = [UIImage svgImageNamed:iconName imgv:cell.ocrTypeIconImage];
        [resultImageArr addObject:tempImage];
        [cell.ocrTypeIconImage setImage:tempImage];
    } else {
        UIImage *tempResultImage = [resultImageArr objectAtIndex:indexPath.row];
        if (tempResultImage != nil) {
            [cell.ocrTypeIconImage setImage:tempResultImage];
        }
    }
    NSString *stateIconName = [idCardState intValue] == 0 ? @"idCardPlus.svg" : @"idCardComplete.svg";
    [cell.idCardStateIcon setImage: [UIImage svgImageNamed:stateIconName imgv:cell.idCardStateIcon.imageView] forState:UIControlStateNormal];
    cell.idCardStateIcon.tag = indexPath.row;
    [cell.idCardStateIcon addTarget:self action:@selector(getTmpTokenAndKey:) forControlEvents:UIControlEventTouchUpInside];
    
    return cell;
}

- (void) tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
//        [tableView deselectRowAtIndexPath:indexPath animated:YES];
        [self getTmpTokenAndKey:[NSNumber numberWithLong:indexPath.row]];
}

- (void) getTmpTokenAndKey:(id)index {
    NSInteger row;
    if ([index isKindOfClass:[NSNumber class]]) {
        NSNumber *indexNum = index;
        row = [indexNum longValue];
        NSLog(@"UIButton:%ld",row);
    } else {
        UIButton *tempButton = index;
        row = tempButton.tag;
         NSLog(@"UIButton:%ld",row);
    }
    switch (row) {
       case 0:
           [self startProcessOcrFRONT];
           break;
       case 1:
           [self startProcessOcrBack];
           break;
       default:
           NSLog(@"%ld",row);
           break;
    }
    
    /**
            临时秘钥使用方法
     */
//    [MBProgressHUD showHUDAddedTo:self.view animated:YES];
//    [tmpTokenHelper doUpdateTmpTokenWithSuccess:^(id  _Nonnull resultInfo) {
//        NSDictionary *credentials = [resultInfo objectForKey:@"Credentials"];
//        NSString *tempToken = [credentials objectForKey:@"Token"];
//        NSString *tmpSecretId = [credentials objectForKey:@"TmpSecretId"];
//        NSString *tmpSecretKey = [credentials objectForKey:@"TmpSecretKey"];
//        [self->ocrSDKKit updateFederationToken:tmpSecretId withTempSecretKey:tmpSecretKey withToken:tempToken];
//
//        switch (row) {
//           case 0:
//               [self startProcessOcrFRONT];
//               break;
//           case 1:
//               [self startProcessOcrBack];
//               break;
//           default:
//               NSLog(@"%ld",row);
//               break;
//        }
//
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//    } Fail:^(NSError * _Nonnull error) {
//        NSLog(@"%@",error.localizedDescription);
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//    }];
}



- (void) startProcessOcrFRONT {
    CustomConfigUI *ocrUIConfig = [[CustomConfigUI alloc] init];
    ocrUIConfig.remindConfirmColor = [UIColor blueColor];
    [ocrSDKKit startProcessOcr:IDCardOCR_FRONT withSDKUIConfig:ocrUIConfig withProcessSucceedBlock:^(id  _Nonnull resultInfo, UIImage *resultImage, id  _Nonnull reserved) {
        [self->resultImageArr replaceObjectAtIndex:0 withObject:resultImage];
        NSMutableArray *afterArr = [NSMutableArray array];
        NSDictionary *item0Dict = self->dataArr[0];
        NSDictionary *item1Dict = self->dataArr[1];
        NSMutableDictionary *mutableItem = [NSMutableDictionary dictionaryWithDictionary:item0Dict];
        [mutableItem setObject:[NSNumber numberWithInt:1] forKey:@"idCardState"];
        [afterArr addObject:mutableItem];
        [afterArr addObject:item1Dict];
        self->dataArr = afterArr;
        NSIndexSet *indexSet = [[NSIndexSet alloc] initWithIndex:0];
        [self->_idCardTableView reloadSections:indexSet withRowAnimation:UITableViewRowAnimationFade];
           
        self->frontDict = resultInfo;
        [self addShowContentView];
    } withProcessFailedBlock:^(NSError * _Nonnull error, id  _Nullable reserved) {
        [self showAlert:error.domain withMessage:[error.userInfo objectForKey:NSLocalizedDescriptionKey]];
    }];
}

- (void) startProcessOcrBack {
    [ocrSDKKit startProcessOcr:IDCardOCR_BACK  withSDKUIConfig:nil withProcessSucceedBlock:^(id  _Nonnull resultInfo, UIImage *resultImage, id  _Nonnull reserved) {
        [self->resultImageArr replaceObjectAtIndex:1 withObject:resultImage];
        
        NSMutableArray *afterArr = [NSMutableArray array];
        NSDictionary *item0Dict = self->dataArr[0];
        NSDictionary *item1Dict = self->dataArr[1];
        NSMutableDictionary *mutableItem = [NSMutableDictionary dictionaryWithDictionary:item1Dict];
        [mutableItem setObject:[NSNumber numberWithInt:1] forKey:@"idCardState"];
        [afterArr addObject:item0Dict];
        [afterArr addObject:mutableItem];
        self->dataArr = afterArr;
        NSIndexSet *indexSet = [[NSIndexSet alloc] initWithIndex:0];
        [self->_idCardTableView reloadSections:indexSet withRowAnimation:UITableViewRowAnimationFade];
        
        self->backDict = resultInfo;
        [self addShowContentView];
    } withProcessFailedBlock:^(NSError * _Nonnull error, id  _Nullable reserved) {
        [self showAlert:error.domain withMessage:[error.userInfo objectForKey:NSLocalizedDescriptionKey]];
    }];
}

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

- (IBAction)touchView:(id)sender {
    [self.view endEditing:YES];
}

- (void)touchView2:(id)sender {
    [self.view endEditing:YES];
}

-(void)textContentDidBegin:(UITextField*)textFiled {
    currentIndex = textFiled.tag;
}

#pragma mark - 键盘通知
- (void)addNoticeForKeyboard {
    
    //注册键盘出现的通知
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWillShow:)
                                                 name:UIKeyboardWillShowNotification object:nil];
    //注册键盘消失的通知
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWillHide:)
                                                 name:UIKeyboardWillHideNotification object:nil];
}

///键盘显示事件
- (void) keyboardWillShow:(NSNotification *)notification {
    //获取键盘高度，在不同设备上，以及中英文下是不同的
    CGFloat kbHeight = [[notification.userInfo objectForKey:UIKeyboardFrameEndUserInfoKey] CGRectValue].size.height;
    
    CGFloat textFieldH = self.resultScollView.frame.origin.y + currentIndex * 44 + 44 + INTERVAL_KEYBOARD;
 
    //计算出键盘顶端到inputTextView panel底端的距离(加上自定义的缓冲距离INTERVAL_KEYBOARD)
//    CGFloat offset = (currentTextField.frame.origin.y+currentTextField.frame.size.height+INTERVAL_KEYBOARD) - (self.view.frame.size.height - kbHeight);
    CGFloat offset = textFieldH - (self.view.frame.size.height - kbHeight) - scrollContentOfsetY;
    // 取得键盘的动画时间，这样可以在视图上移的时候更连贯
    double duration = [[notification.userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
     
    //将视图上移计算好的偏移
    if(offset > 0) {
        [UIView animateWithDuration:duration animations:^{
            self.view.frame = CGRectMake(0.0f, -offset, self.view.frame.size.width, self.view.frame.size.height);
        }];
    }
}
 
///键盘消失事件
- (void) keyboardWillHide:(NSNotification *)notify {
    // 键盘动画时间
    double duration = [[notify.userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
     
    //视图下沉恢复原状
    [UIView animateWithDuration:duration animations:^{
        self.view.frame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height);
    }];
}


- (void) scrollViewDidScroll:(UIScrollView *)scrollView {
    scrollContentOfsetY = scrollView.contentOffset.y;
}


- (BOOL) textFieldShouldReturn:(UITextField *)textField {
    [self.view endEditing:YES];
    return YES;
}

@end

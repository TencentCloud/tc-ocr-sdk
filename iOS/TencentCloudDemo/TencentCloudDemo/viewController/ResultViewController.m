//
//  ResultViewController.m
//  TencentOcrSDKDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "ResultViewController.h"
#import "ResultTableViewCell.h"

static NSString *CELL_ID = @"id_result_cell_id";
static const CGFloat INTERVAL_KEYBOARD = 5.0;

@interface ResultViewController ()<UITableViewDelegate,UITableViewDataSource,UITextFieldDelegate>{
    NSArray *titleArr;
    int64_t currentIndex;
    CGFloat scrollContentOfsetY;
}

@end

@implementation ResultViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *title =  @"识别结果";
    [self setTitle:title];
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    
    _resultTableView.bounces = YES;
    _resultTableView.alwaysBounceVertical = YES;
    _resultTableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    _resultTableView.dataSource = self;
    _resultTableView.delegate = self;
    [_resultTableView registerNib:[UINib nibWithNibName:@"ResultTableViewCell" bundle:nil] forCellReuseIdentifier:CELL_ID];
    
    
    [self addNoticeForKeyboard];
     //[[OcrSDKKit sharedInstance] loadSDKConfigWithSecretId:secretId withSecretKey:secretKey withTempToken:nil withOption:nil];
    // Do any additional setup after loading the view from its nib.
    
   
    
}

- (void)viewWillAppear:(BOOL)animated {
    if (_resultImage != nil) {
        [self.resultImageView setImage:_resultImage];
    }
}

- (void) setResultDict:(NSDictionary *)resultDict {
    if (resultDict != nil) {
        if ([self.cardType isEqualToString:@"BankCard"]) {
            _resultDict = resultDict;
            titleArr = [resultDict allKeys];
        } else if ([self.cardType isEqualToString:@"BusinessCard"]) {
            NSArray *tempArr = [resultDict objectForKey:@"BusinessCardInfos"];
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            for (NSDictionary *dict in tempArr) {
                [dictionary setObject:[dict objectForKey:@"Value"]  forKey:[dict objectForKey:@"Name"]];
            }
            titleArr = [dictionary allKeys];
            _resultDict = dictionary;
        }
        
    }
}

- (NSInteger) numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

//行高
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 44;
}

- (NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [titleArr count];
}

- (UITableViewCell *) tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    ResultTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CELL_ID forIndexPath:indexPath];
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    NSString *title = [titleArr objectAtIndex:indexPath.row];
    NSString *content = [_resultDict objectForKey:title];
    [cell.title setText:title];
    [cell.content setText:content];
    cell.content.tag = indexPath.row;
    [cell.content addTarget:self action:@selector(textContentDidBegin:) forControlEvents:UIControlEventEditingDidBegin];
    cell.content.returnKeyType = UIReturnKeyDone;//变为搜索按钮
    cell.content.delegate = self;
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    NSLog(@"indexPath row %ld",indexPath.row);
    [self.view endEditing:YES];
}

- (IBAction)touchView:(id)sender {
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
    
    CGFloat textFieldH = self.resultTableView.frame.origin.y + currentIndex * 44 + 44 + INTERVAL_KEYBOARD;
 
    //计算出键盘顶端到inputTextView panel底端的距离(加上自定义的缓冲距离INTERVAL_KEYBOARD));
    CGFloat offset = textFieldH - (self.view.frame.size.height - kbHeight) - scrollContentOfsetY;
    double duration = [[notification.userInfo objectForKey:UIKeyboardAnimationDurationUserInfoKey] doubleValue];
     
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

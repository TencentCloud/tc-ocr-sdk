//
//  ViewController.m
//  TencentOcrDemo
//
//  Copyright © 2020 tencent. All rights reserved.
//

#import "ViewController.h"
#import "MianPageTableViewCell.h"
#import "UIColorUtil.h"
#import "UIImage+SVGKit.h"
#import "OcrSelectTypeViewController.h"

@interface ViewController ()<UIAlertViewDelegate, UITableViewDelegate, UITableViewDataSource>{
    NSArray *dataArr;
}
@property (nonatomic, strong) NSArray *dataSource;
@property (nonatomic, strong) UIAlertController *alert;

@end

@implementation ViewController
@synthesize alert;

- (void)viewDidLoad {
    [super viewDidLoad];
    //init data
    dataArr = self.dataSource;
    _mainTableView.bounces = YES;
    _mainTableView.alwaysBounceVertical = YES;
    _mainTableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    [_mainTableView registerNib:[UINib nibWithNibName:NSStringFromClass([MianPageTableViewCell class]) bundle:nil] forCellReuseIdentifier:@"main_cell_id"];
    
    [self setTitle:@"腾讯云OCR"];
    self.navigationController.navigationBar.barStyle=UIBarStyleBlack;
    [self.navigationController.navigationBar setTitleTextAttributes:@{NSFontAttributeName:[UIFont systemFontOfSize:18],NSForegroundColorAttributeName:[UIColor whiteColor]}];
    [self.navigationController.navigationBar setBarTintColor: [UIColor colorWithRed:5/255.0 green:106/255.0 blue:1 alpha:1]];
    [self.navigationController.navigationBar setShadowImage:[UIImage new]];
    [self.navigationController.navigationBar setBackgroundImage:[UIImage new] forBarMetrics:UIBarMetricsDefault];


    _mainTableView.dataSource = self;
    _mainTableView.delegate = self;
  
}

- (NSArray *)dataSource {
    if (_dataSource == nil) {
        NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"modelType" ofType:@"plist"];
        _dataSource = [NSArray arrayWithContentsOfFile:plistPath];
    }
    return _dataSource;
}

#pragma mark - tableView dataSource
// 返回列表中需要显示的分区数
-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    return 1;
}

// 返回每个分区中显示的行数
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    // 如果第一个分区显示5行，第二个分区显示7行
    // 分区和行的索引跟数组是一样的，都默认从0开始
    return _dataSource.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    MianPageTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"main_cell_id" forIndexPath:indexPath];
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    NSDictionary *tempDict = [_dataSource objectAtIndex:indexPath.row];
    [cell.modelTitleLabel setText:tempDict[@"title"]];
    [cell.modelDescLabel setText:tempDict[@"desc"]];
    cell.modelDescLabel.numberOfLines = 0;
    cell.modelDescLabel.lineBreakMode = NSLineBreakByWordWrapping;
    NSString *iconName = tempDict[@"iconName"];
    [cell.modelIconImage setImage:[UIImage svgImageNamed:iconName imgv:cell.modelIconImage]];
    return cell;
}

//行高
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
    return 200;
}

//选中时 调用的方法
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
//    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    OcrSelectTypeViewController *viewController = [[OcrSelectTypeViewController alloc] initWithNibName:NSStringFromClass([OcrSelectTypeViewController class]) bundle:nil];
    viewController.ocrModel = indexPath.row == 0 ? 1:0;
    [self.navigationController pushViewController:viewController animated:YES];
}

#pragma mark other Method
- (void)showAlert:(NSString *)title withMessage:(NSString*)message
{
    dispatch_async(dispatch_get_main_queue(), ^{
        self->alert = [UIAlertController alertControllerWithTitle:title message:message preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"好的" style:UIAlertActionStyleDefault
        handler:^(UIAlertAction * action) {}];
        [self->alert addAction:defaultAction];
        [self presentViewController:self->alert animated:NO completion:nil];
    });
}


@end

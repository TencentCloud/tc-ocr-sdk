//
//  OcrCommDef.h
//  OcrSDKKit
//
//  Created by v_clvchen on 2020/7/20.
//  Copyright © 2020 tencent. All rights reserved.
//

#import <Foundation/Foundation.h>

///ocr的业务类型
NS_ASSUME_NONNULL_BEGIN
typedef NS_ENUM(int, OcrType)
{
     IDCardOCR_FRONT = 0,
     IDCardOCR_BACK,
     BankCardOCR,
     BusinessCardOCR
};
typedef NS_ENUM(int,OcrModeType){
    OCR_DETECT_MANUAL = 0, /// 手动拍摄
    OCR_DETECT_AUTO_MANUAL, /// 自动识别  tips：20s后提示 是否切换到手动拍摄
};

NS_ASSUME_NONNULL_END

//
//  StateNameList.h
//  yt-ios-face-recognition-demo
//
//  Created by Marx Wang on 2019/9/6.
//  Copyright © 2019 Tencent.Youtu. All rights reserved.
//

#pragma once
#import <Foundation/Foundation.h>
#include "YtSDKCommonDefines.h"
typedef enum  : int
{
    UNKNOWN_STATE = 0,
    IDLE_STATE = 1,
    SILENT_STATE,
    ACTION_STATE,
    REFLECT_STATE,
    OCR_AUTO_STATE,
    OCR_MANUAL_STATE,
    NET_FETCH_STATE,
    NET_REQ_RESULT_STATE,
    NET_REQ_REFLECT_RESULT_STATE,
    NET_OCR_REQ_RESULT_STATE,
    STATE_COUNT
}StateName;

YT_SDK_EXPORT @interface StateNameHelper : NSObject
+ (NSArray *)names;
+ (NSString *)nameForType:(StateName)type;
+ (StateName)typeFromName:(NSString*)name;
@end


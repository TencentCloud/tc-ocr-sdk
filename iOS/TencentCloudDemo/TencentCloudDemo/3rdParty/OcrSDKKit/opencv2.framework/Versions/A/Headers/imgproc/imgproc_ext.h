//
//  imgproc_ext.h
//  opencv_imgproc
//
//  Created by marxwang(王小松) on 2019/10/29.
//

#ifndef imgproc_ext_h
#define imgproc_ext_h
#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/types_c.h"
#if defined(__APPLE__)
#include <TargetConditionals.h>
#import <UIKit/UIKit.h>
#import <ImageIO/ImageIO.h>
namespace cv{
CV_EXPORTS Mat UIImage2cvMat(CGImageRef imageRef, int code=CV_8UC4);
CV_EXPORTS UIImage *cvMat2UIImage(Mat &mat);
CV_EXPORTS Mat buffer2cvMat(CVImageBufferRef buffRef, int code=CV_8UC4);
CV_EXPORTS UIImage *buffer2UIImage(CVImageBufferRef buffRef);
}
#endif
#endif /* imgproc_ext_h */

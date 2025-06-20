//
//  SharedDefaults.swift
//  RNBoilerPlate
//
//  Created by 도형 on 2025/06/04
//


#import <Foundation/Foundation.h>
#import "SharedDefaults.h"
#import "RNBoilerPlate-Swift.h"

@implementation SharedDefaults

-(dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(SharedDefaults);

RCT_EXPORT_METHOD(set:(NSString *)data
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try{
    NSUserDefaults *shared = [[NSUserDefaults alloc]initWithSuiteName:@"group.dohyeong.widget"];
    [shared setObject:data forKey:@"data"];
    [shared synchronize];
    if (@available(iOS 14, *)) {
       [WidgetKitHelper reloadAllTimelines];
     } else {
         // Fallback on earlier versions
     }
    resolve(@"true");
  }@catch(NSException *exception){
    reject(@"get_error",exception.reason, nil);
  }

}

@end

//
//  WidgetKit.swift
//  ReactNativeIOSWidget
//
//  Created by 도형 on 2025/08/16
//
import WidgetKit

@available(iOS 14, *)
@objcMembers final class WidgetKitHelper: NSObject {
  
  class func reloadAllTimelines() {
#if arch(arm64) || arch(i386) || arch(x86_64)
    WidgetCenter.shared.reloadAllTimelines()
#endif
  }
}


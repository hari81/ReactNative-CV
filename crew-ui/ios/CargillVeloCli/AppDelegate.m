/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "/Users/crmdev1/Desktop/CargillReactProjBackup/crew-frontend17:10/crew-ui/node_modules/react-native/React/Base/RCTBundleURLProvider.h"
//#import <React/RCTBundleURLProvider.h>
#import "/Users/crmdev1/Desktop/CargillReactProjBackup/crew-frontend17:10/crew-ui/node_modules/react-native/React/Base/RCTRootView.h"
//#import <React/RCTRootView.h>
//#import <BugsnagReactNative/BugsnagReactNative.h>
#import "/Users/crmdev1/Desktop/CargillReactProjBackup/crew-frontend17:10/crew-ui/node_modules/bugsnag-react-native/cocoa/BugsnagReactNative.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [BugsnagReactNative start];
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"CargillVeloCli"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end

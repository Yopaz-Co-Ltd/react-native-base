1. Change app name, bundle id: `npx react-native-rename "ReactNativeBase" -b com.kira.reactnativebase`
2. Firebase distribution:
   2.1. Android: 
   - Develop: fastlane android release_develop 
   - Product: fastlane android release_product
   2.2. iOS: 
   - Develop: fastlane ios release_develop
   - Product: fastlane ios release_product
3. Increase build version: npx react-native-version --never-amend
4. Change app icon (https://github.com/bamlab/react-native-make/blob/master/docs/set-icon.md)
   - Change app icon in resources
     - app/resources/images/app_icon_ios.png
     - app/resources/images/app_icon_android.png
   - Run command: 
     - Change ios app icon: react-native set-icon --platform ios --path app/resources/images/app_icon/app_icon_ios.png
     - Change android app icon: react-native set-icon --platform android --path app/resources/images/app_icon/app_icon_android.png
5. Change splash screen
   - iOS: Change splash image with splash.png, splash@2x.png, splash@3x.png in folder `ios/ReactNativeBase/Images.xcassets/splash.imageset`
   - Android: Open Android Studio, parse splash.svg to splash.xml (saved in drawables folder)
6. Config multiple environment: https://morioh.com/p/ae25af711b30

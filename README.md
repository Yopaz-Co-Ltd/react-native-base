1. Config **.env.develop** and **.env.product** file

    1. **.env.develop**

        `SERVER_HOST=demo6587384.mockable.io` <br/>
        `ENCRYPTION_SECRET_KEY=akjsdhaksdn891723akjs` <br/>
        `APPLICATION_NAME=RNBaseDevelop` <br/>
        `APPLICATION_VERSION=0.0.1` <br/>
        `APPLICATION_BUILD=1` <br/>
        `APPLICATION_ID=com.kira.reactnativebase.develop`

    2. **.env.staging**

        `SERVER_HOST=demo6587384.mockable.io` <br/>
        `ENCRYPTION_SECRET_KEY=akjsdhaksdn891723akjs` <br/>
        `APPLICATION_NAME=RNBaseStaging` <br/>
        `APPLICATION_VERSION=0.0.1` <br/>
        `APPLICATION_BUILD=1` <br/>
        `APPLICATION_ID=com.kira.reactnativebase.staging`

    3. **.env.product**

        `SERVER_HOST=demo6587384.mockable.io` <br/>
        `ENCRYPTION_SECRET_KEY=akjsdhaksdn891723akjs` <br/>
        `APPLICATION_NAME=RNBaseProduct` <br/>
        `APPLICATION_VERSION=0.0.1` <br/>
        `APPLICATION_BUILD=1` <br/>
        `APPLICATION_ID=com.kira.reactnativebase.product`

2. Change app name, bundle id: `npx react-native-rename "ReactNativeBase" -b com.kira.reactnativebase`
3. Firebase distribution:
    - Android:
        - Develop: `fastlane android release_develop`
        - Product: `fastlane android release_product`
    - iOS:
        - Develop: `fastlane ios release_develop`
        - Product: `fastlane ios release_product`
4. Increase build version: `npx react-native-version --never-amend`
5. Change app icon (https://github.com/bamlab/react-native-make/blob/master/docs/set-icon.md)
    - Change app icon in resources
        - app/resources/images/app_icon_ios.png
        - app/resources/images/app_icon_android.png
    - Run command:
        - Change ios app icon: `react-native set-icon --platform ios --path app/resources/images/app_icon/app_icon_ios.png`
        - Change android app icon: `react-native set-icon --platform android --path app/resources/images/app_icon/app_icon_android.png`
6. Change splash screen
    - iOS: Change splash image with splash.png, splash@2x.png, splash@3x.png in
      folder `ios/ReactNativeBase/Images.xcassets/splash.imageset`
    - Android: Open Android Studio, change splash.png saved in drawables folder (5 files)
7. Config multiple environment: https://morioh.com/p/ae25af711b30
8. Choose alternative encrypted storage for Async Storage:
    - https://reactnative.dev/docs/security
    - https://javascript.plainenglish.io/trending-storage-options-for-react-native-developers-8671fbffb686
    - https://github.com/mrousavy/react-native-mmkv
9. Encrypt / Decrypt data, redux-persist encrypt
    - https://docs.google.com/document/d/1kH5cfmFXuMp9pgIo6G4NET6bPcf8-UVSS9Il0ZgLMXQ/edit#

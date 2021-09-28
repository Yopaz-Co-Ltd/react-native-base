/**
 * @format
 */

import 'react-native-gesture-handler'
import '@react-native-firebase/crashlytics'
import '@react-native-firebase/analytics'
import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)

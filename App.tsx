import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {LogBox, View} from 'react-native'
import {Context} from './app/context'
import MainNavigator from './app/screens/main/mainNavigator'
import AuthNavigator from './app/screens/auth/authNavigator'
import Spinner from 'react-native-loading-spinner-overlay'
import {REQUEST_TIMEOUT} from './app/configs/api'
import {getIsLoggedIn} from './app/screens/auth/login/repository'

LogBox.ignoreLogs([
  'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
])

//todo re-config firebase crashlytics

const App = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!loading) {
      return
    }
    setTimeout(() => {
      setLoading(false)
    }, REQUEST_TIMEOUT)
  }, [loading])

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    getIsLoggedIn()
      .then(isLogged => {
        setIsLoggedIn(isLogged)
      })
      .catch(() => {
        setIsLoggedIn(false)
      })
  }, [])

  if (isLoggedIn === null) {
    return null
  }

  return (
    <Context.Provider
      value={{
        setLoading,
        setIsLoggedIn,
      }}>
      <NavigationContainer>
        {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      {loading ? (
        <View>
          <Spinner visible={loading} />
        </View>
      ) : null}
    </Context.Provider>
  )
}

export default App

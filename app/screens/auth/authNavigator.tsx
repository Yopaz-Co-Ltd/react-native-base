import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ScreenNames from '@configs/screen_names'
import LoginScreen from '@screens/auth/login/login.screen'
import strings from '@resources/strings'

const AuthStack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={ScreenNames.LOGIN}
        component={LoginScreen}
        options={{
          title: strings.login.title,
        }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigator

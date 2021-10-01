import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ScreenNames from '@configs/screen_names'
import WelcomeScreen from '@screens/main/welcome/welcome.screen'
import strings from '@resources/strings'

const MainStack = createStackNavigator()

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={ScreenNames.WELCOME}
        component={WelcomeScreen}
        options={{title: strings.welcome.title}}
      />
    </MainStack.Navigator>
  )
}

export default MainNavigator

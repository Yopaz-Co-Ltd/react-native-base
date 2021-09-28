import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import WelcomeScreen from './app/screens/main/welcome/welcome.screen'
import ScreenNames from './app/configs/screen_names'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.WELCOME} component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

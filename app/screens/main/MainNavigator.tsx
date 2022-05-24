import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ScreenNames from '@screens/ScreenNames'
import WelcomeScreen from '@screens/main/welcome/WelcomeScreen'

const MainStack = createStackNavigator()

const MainNavigator = (): JSX.Element => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name={ScreenNames.WELCOME} component={WelcomeScreen} />
        </MainStack.Navigator>
    )
}

export default MainNavigator

import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {WELCOME_SCREEN} from '@app/navigation/ScreenNames'
import WelcomeScreen from '@screens/main/welcome/WelcomeScreen'

export type MainStackParamList = {
    [WELCOME_SCREEN]: undefined
}

const MainStack = createStackNavigator<MainStackParamList>()

const MainNavigator = (): JSX.Element => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name={WELCOME_SCREEN} component={WelcomeScreen} />
        </MainStack.Navigator>
    )
}

export default MainNavigator

import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ScreenNames from '@screens/ScreenNames'
import LoginScreen from '@screens/auth/login/LoginScreen'
import Strings from '@resources/localization/Strings'

const AuthStack = createStackNavigator()

const AuthNavigator = (): JSX.Element => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name={ScreenNames.LOGIN}
                component={LoginScreen}
                options={{
                    title: Strings.login.login,
                    headerShown: false,
                }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthNavigator

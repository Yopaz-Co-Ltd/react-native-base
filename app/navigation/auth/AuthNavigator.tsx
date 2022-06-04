import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '@screens/auth/login/LoginScreen'
import Strings from '@resources/localization/Strings'
import {LOGIN_SCREEN} from '@app/navigation/ScreenNames'

export type AuthStackParamList = {
    [LOGIN_SCREEN]: undefined
}

const AuthStack = createStackNavigator<AuthStackParamList>()

const AuthNavigator = (): JSX.Element => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name={LOGIN_SCREEN}
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

import React, {useRef, useState} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native'
import Strings from '@resources/localization/Strings'
import Colors from '@resources/Colors'
import Dimens from '@resources/Dimens'
import {useDispatch} from 'react-redux'
import actions from '@screens/auth/AuthActions'
import RNTextInput from '@base/views/text-input/RNTextInput'
import RNButton from '@base/views/button/RNButton'
import RNImage from '@base/views/image/RNImage'

const LoginScreen = () => {
    const dispatch = useDispatch()
    const passwordRef = useRef<any>(null)
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} scrollEnabled={false}>
                {/*header*/}
                <Text style={styles.header}>{Strings.login.appName}</Text>
                <RNImage style={styles.loginIcon} source={require('@resources/images/login/login.png')} />
                <Text style={styles.signInText}>{Strings.login.login}</Text>
                {/*email*/}
                <RNTextInput
                    style={styles.email}
                    placeholder={Strings.login.emailPlaceholder}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    keyboardType={'email-address'}
                    onChangeText={setEmail}
                />
                {/*password*/}
                <RNTextInput
                    ref={passwordRef}
                    style={styles.password}
                    placeholder={Strings.login.passwordPlaceholder}
                    secureTextEntry={true}
                    returnKeyType={'done'}
                    onChangeText={setPassword}
                />
                {/*login button*/}
                <RNButton
                    title={Strings.login.login}
                    onPress={() => {
                        dispatch(actions.login(email, password))
                    }}
                    style={styles.loginButton}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {backgroundColor: Colors.white},
    scrollView: {
        height: Dimens.matchParent,
        backgroundColor: Colors.white,
    },
    header: {
        color: Colors.white,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: Colors.primary,
        paddingTop: 36,
        paddingBottom: 36,
    },
    loginIcon: {width: 48, height: 48, alignSelf: 'center', marginTop: 16},
    signInText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 16,
    },
    email: {marginTop: 32, marginStart: 32, marginEnd: 32},
    password: {marginTop: 16, marginStart: 32, marginEnd: 32},
    loginButton: {marginTop: 32, marginStart: 32, marginEnd: 32},
})

export default LoginScreen

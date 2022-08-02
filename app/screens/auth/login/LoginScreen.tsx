import React, {useEffect, useRef, useState} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput} from 'react-native'
import Strings from '@resources/localization/Strings'
import Colors from '@resources/Colors'
import Dimens from '@resources/Dimens'
import {useDispatch, useSelector} from 'react-redux'
import actions from '@app/redux/auth/AuthActions'
import RNTextInput from '@base/views/text-input/RNTextInput'
import RNButton from '@base/views/button/RNButton'
import RNImage from '@base/views/image/RNImage'
import Images from '@resources/images/Images'
import AuthSelector from '@app/redux/auth/AuthSelector'
import {LocalStorage} from '@app/base/local-storage/LocalStorage'

const LoginScreen = (): JSX.Element => {
    const dispatch = useDispatch()
    const passwordRef = useRef<TextInput>(null)
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const getUserAuth = useSelector(AuthSelector?.getUserAuth)

    useEffect(() => {
        // todo remove fake function
        console.log('getUserAuth', getUserAuth)
        LocalStorage.getItem('@key1')
            .then(value => {
                console.log('value key 1', value)
            })
            .catch(e => {
                console.log('e', e)
            })
    }, [getUserAuth])
    return (
        // todo remove fake function
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} scrollEnabled={false}>
                {/*header*/}
                <Text style={styles.header}>{Strings.login.appName}</Text>
                <RNImage style={styles.loginIcon} source={Images.login} />
                <Text style={styles.signInText}>{Strings.login.login}</Text>
                {/*email*/}
                <RNTextInput
                    style={styles.email}
                    placeholder={Strings.login.emailPlaceholder}
                    onSubmitEditing={() => passwordRef?.current?.focus()}
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
                <RNButton
                    title={'Test persist'}
                    onPress={() => {
                        dispatch(actions.testPersist())
                    }}
                    style={styles.loginButton}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    email: {marginEnd: 32, marginStart: 32, marginTop: 32},
    header: {
        backgroundColor: Colors.primary,
        color: Colors.white,
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        paddingBottom: 36,
        paddingTop: 36,
        textAlign: 'center',
    },
    loginButton: {marginEnd: 32, marginStart: 32, marginTop: 32},
    loginIcon: {alignSelf: 'center', height: 48, marginTop: 16, width: 48},
    password: {marginEnd: 32, marginStart: 32, marginTop: 16},
    safeArea: {backgroundColor: Colors.white},
    scrollView: {
        backgroundColor: Colors.white,
        height: Dimens.matchParent,
    },
    signInText: {
        fontSize: 18,
        marginTop: 16,
        textAlign: 'center',
    },
})

export default LoginScreen

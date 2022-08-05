import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import RNButton from '@base/views/button/RNButton'
import Strings from '@resources/localization/Strings'
import Typography from '@resources/Typography'
import {useDispatch} from 'react-redux'
import AuthActions from '@app/redux/auth/AuthActions'
import Images from '@resources/images/Images'

const WelcomeScreen = (): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <View>
            {Images.iconSetting}
            <Text style={[styles.title, Typography.text14RegularBlack]}>Welcome</Text>
            <RNButton
                style={styles.logoutButton}
                title={Strings.welcome.logout}
                onPress={() => dispatch(AuthActions.logout())}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    logoutButton: {margin: 16},
    title: {alignSelf: 'center', marginTop: 16},
})

export default WelcomeScreen

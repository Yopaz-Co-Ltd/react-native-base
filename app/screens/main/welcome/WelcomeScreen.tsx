import React from 'react'
import {Text, View} from 'react-native'
import RNButton from '@base/views/button/RNButton'
import Strings from '@resources/localization/Strings'
import Typography from '@resources/Typography'
import {useDispatch} from 'react-redux'
import AuthActions from '@app/redux/auth/AuthActions'
import Images from '@resources/images/Images'
import {ScaledSheet, moderateVerticalScale, verticalScale, scale} from 'react-native-size-matters'

const WelcomeScreen = (): JSX.Element => {
    const dispatch = useDispatch()

    return (
        <View>
            {Images.iconSetting}
            <Text style={[styles.title, Typography.text14RegularBlack]}>Welcome</Text>
            <Text style={[styles.title, Typography.text14RegularBlack]}>Example resize matter</Text>
            <Text style={[styles.title, Typography.text14RegularBlack]}>1.Not Use Resize </Text>
            <Text style={[Typography.text14RegularBlack, styles.titleResize]}>2. Use Resize </Text>
            <RNButton
                style={styles.logoutButton}
                title={Strings.welcome.logout}
                onPress={() => dispatch(AuthActions.logout())}
            />
            <RNButton
                style={styles.logoutButtonUseResize}
                title={Strings.welcome.logout}
                onPress={() => dispatch(AuthActions.logout())}
            />
        </View>
    )
}

const styles = ScaledSheet.create({
    titleResize: {
        fontSize: moderateVerticalScale(14),
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 16,
        marginHorizontal: 16,
    },
    logoutButtonUseResize: {
        marginTop: verticalScale(16),
        marginHorizontal: scale(16),
    },
    title: {alignSelf: 'center', marginTop: 16},
})

export default WelcomeScreen

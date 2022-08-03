import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import RNButton from '@base/views/button/RNButton'
import Strings from '@resources/localization/Strings'
import Typography from '@resources/Typography'
import {useDispatch} from 'react-redux'
import AuthActions from '@app/redux/auth/AuthActions'
import Images from '@resources/images/Images'
import {DownloadDirectoryPath, exists, readDir} from 'react-native-fs'
import {DownloadFiles} from '@base/common/DownloadFileUtils'
import Constants from '@resources/Constants'

const WelcomeScreen = (): JSX.Element => {
    const dispatch = useDispatch()
    // todo remove fake function
    const imageUrl = 'https://reactnative.dev/img/header_logo.png'
    const urlFile = 'http://www.africau.edu/images/default/sample.pdf'
    const videoUrl = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'

    const handleDownloadFile = () => {
        DownloadFiles({fileUrl: videoUrl, type: Constants.typeDownload.public})
    }
    // todo remove fake function
    const handleReadDirFile = () => {
        exists(`${DownloadDirectoryPath}/MyApp`)
            .then(success => {
                if (success) {
                    readDir(`${DownloadDirectoryPath}/MyApp`)
                        .then(res => {
                            console.log('read dir:', res)
                        })
                        .catch(err => console.log('err read dir:', err))
                }
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {})
    }

    return (
        <View>
            {Images.iconSetting}
            <Text style={[styles.title, Typography.text14RegularBlack]}>Welcome</Text>
            <RNButton
                style={styles.logoutButton}
                title={Strings.welcome.logout}
                onPress={() => dispatch(AuthActions.logout())}
            />
            {/* todo remove fake function */}
            <RNButton style={styles.logoutButton} title={'download file'} onPress={() => handleDownloadFile()} />
            <RNButton style={styles.logoutButton} title={'read file'} onPress={() => handleReadDirFile()} />
        </View>
    )
}

const styles = StyleSheet.create({
    logoutButton: {margin: 16},
    title: {alignSelf: 'center', marginTop: 16},
})

export default WelcomeScreen

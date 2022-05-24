import React from 'react'
import Dimens from '@resources/Dimens'
import Colors from '@resources/Colors'
// eslint-disable-next-line import/default
import Spinner from 'react-native-spinkit'
import {StyleSheet, View} from 'react-native'

const LoadingView = ({isLoading}: {isLoading: boolean}): JSX.Element | null => {
    if (!isLoading) {
        return null
    }
    return (
        <View style={styles.root}>
            <Spinner type={'Circle'} color={Colors.white} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: Colors.modalDim,
        height: Dimens.matchParent,
        justifyContent: 'center',
        position: 'absolute',
        width: Dimens.matchParent,
    },
})

export default LoadingView

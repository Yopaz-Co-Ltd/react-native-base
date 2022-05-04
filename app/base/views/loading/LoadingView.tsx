import React from 'react'
import Dimens from '@resources/Dimens'
import Colors from '@resources/Colors'
import Spinner from 'react-native-spinkit'
import {StyleSheet, View} from 'react-native'

const LoadingView = ({isLoading}: {isLoading: boolean}) => {
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
        position: 'absolute',
        width: Dimens.matchParent,
        height: Dimens.matchParent,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.modalDim,
    },
})

export default LoadingView

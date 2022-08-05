import React from 'react'
import {StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native'
import Colors from '@resources/Colors'
import Typography from '@resources/Typography'

const RNButton = ({title, onPress, style}: RNButtonProps): JSX.Element => {
    return (
        <TouchableOpacity style={[styles.touch, style]} onPress={onPress}>
            <Text style={Typography.text18BoldWhite}>{title}</Text>
        </TouchableOpacity>
    )
}

type RNButtonProps = {
    title: string
    onPress?: () => void
    style?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
    touch: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 6,
        paddingBottom: 16,
        paddingTop: 16,
    },
})

export default RNButton

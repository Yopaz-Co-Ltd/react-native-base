import React from 'react'
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native'
import Colors from '@resources/Colors'
import Typography from '@resources/Typography'

const RNButton = ({title, onPress, style}: RNButtonProps) => {
    return (
        <TouchableOpacity style={[styles.touch, style]} onPress={onPress}>
            <Text style={Typography.text18BoldWhite}>{title}</Text>
        </TouchableOpacity>
    )
}

type RNButtonProps = {
    title: string
    onPress?: () => void
    style?: TextStyle
}

const styles = StyleSheet.create({
    touch: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 6,
    },
})

export default RNButton

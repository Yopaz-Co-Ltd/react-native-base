import React, {forwardRef, LegacyRef} from 'react'
import {StyleSheet, TextInput, TextInputProps} from 'react-native'
import Typography from '@resources/Typography'
import Colors from '@resources/Colors'

const RNTextInput = forwardRef((props: TextInputProps, ref: LegacyRef<TextInput>) => {
    return <TextInput {...props} ref={ref} style={[Typography.text18RegularBlack, styles.input, props.style]} />
})

const styles = StyleSheet.create({
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 6,
    },
})

export default RNTextInput

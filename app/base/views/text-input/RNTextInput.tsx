import React, {forwardRef, LegacyRef} from 'react'
import {StyleSheet, TextInput, TextInputProps} from 'react-native'
import Typography from '@resources/Typography'
import Colors from '@resources/Colors'

const RNTextInput = forwardRef((props: TextInputProps, ref: LegacyRef<TextInput>) => {
    return <TextInput {...props} ref={ref} style={[Typography.text18RegularBlack, styles.input, props.style]} />
})

RNTextInput.displayName = 'RNTextInput'

const styles = StyleSheet.create({
    input: {
        borderColor: Colors.black,
        borderRadius: 6,
        borderWidth: 1,
        padding: 12,
    },
})

export default RNTextInput

import React, {Ref} from 'react'
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
} from 'react-native'
import colors from '../../resources/colors'

export type InputFieldProps = {
  label?: string
  required?: boolean
  multiline?: boolean
  placeholder?: string
  secureTextEntry?: boolean
  editable?: boolean
  value?: string
  keyboardType?: KeyboardTypeOptions
  reference?: Ref<any>
  style?: StyleProp<TextStyle>
  returnKeyType?: ReturnKeyTypeOptions
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void
  setValueState?: (text: string) => void
}

const InputField = (props: InputFieldProps) => {
  return (
    <View>
      {props.label !== undefined ? (
        <Text style={styles.label}>{`${props.label}${
          props.required ? ' *' : ''
        }`}</Text>
      ) : (
        <View />
      )}
      <TextInput
        textContentType={'oneTimeCode'}
        autoCapitalize="none"
        multiline={props.multiline ?? false}
        style={[
          styles.input,
          props.style,
          props.multiline ? {paddingTop: 16} : {},
        ]}
        ref={props.reference}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType ?? 'default'}
        secureTextEntry={props.secureTextEntry ?? false}
        returnKeyType={props.returnKeyType ?? 'next'}
        blurOnSubmit={true}
        onSubmitEditing={props.onSubmitEditing}
        onFocus={props.onFocus}
        editable={props.editable ?? true}
        selectTextOnFocus={props.editable ?? true}
        defaultValue={props.value ? props.value + '' : ''}
        onChangeText={props.setValueState}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginTop: 24,
    marginStart: 16,
    marginEnd: 16,
  },
  input: {
    color: colors.black,
    fontSize: 16,
    marginTop: 16,
    marginStart: 16,
    marginEnd: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
  },
})

export default InputField

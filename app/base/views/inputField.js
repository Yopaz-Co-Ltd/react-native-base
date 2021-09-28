import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import colors from "../../resources/colors";

const InputField = props => {
  return (
    <View>
      {props.label !== undefined ? (
        <Text style={styles.label}>{`${props.label}${
          props.required === true ? ' *' : ''
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
          props.multiline === true ? {paddingTop: 16} : {},
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

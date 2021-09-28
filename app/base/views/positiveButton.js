import React from 'react'
import {StyleSheet, Text, TouchableHighlight} from 'react-native'
import colors from '../../resources/colors'

const PositiveButton = props => {
  return (
    <TouchableHighlight
      disabled={props.disabled ?? false}
      style={[styles.root, props.style]}
      onPress={props.onPress}
      underlayColor={props.underlayColor ?? colors.buttonPressing}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
    padding: 16,
    marginTop: 32,
    marginStart: 16,
    marginEnd: 16,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    alignSelf: 'center',
  },
})

export default PositiveButton

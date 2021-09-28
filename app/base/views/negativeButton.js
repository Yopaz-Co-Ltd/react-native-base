import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import colors from '../../resources/colors'

const NegativeButton = props => {
  return (
    <TouchableOpacity
      style={[styles.root, props.style]}
      onPress={props.onPress}
      underlayColor={colors.buttonPressing}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    marginTop: 32,
    marginStart: 16,
    marginEnd: 16,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
})

export default NegativeButton

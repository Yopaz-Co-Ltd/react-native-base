import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  ViewStyle,
} from 'react-native'
import colors from '../../resources/colors'

export type PositiveButtonProps = {
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  onPress: () => void
  underlayColor?: string
  title?: string
}

const PositiveButton = (props: PositiveButtonProps) => {
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

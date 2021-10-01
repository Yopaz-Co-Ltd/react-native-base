import React from 'react'
import {
  ColorPropType,
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity
} from "react-native";
import colors from '../../resources/colors'

export type NegativeButtonProps = {
  style?: StyleProp<TextStyle>
  onPress?: () => void

}

const NegativeButton = (props: NegativeButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.root, props.style]}
      onPress={props.onPress}
      underlayColor={'#ff0000'}>
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

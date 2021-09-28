import React from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import colors from '../../../resources/colors'
import strings from '../../../resources/strings'
import CreateImage from '../../../resources/images/create.svg'

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Text>{strings.welcome.welcome}</Text>
        <CreateImage />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: colors['light/white-snow'],
  },
  root: {
    height: '100%',
  },
})

export default WelcomeScreen

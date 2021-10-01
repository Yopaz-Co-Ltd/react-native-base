import React, {useContext} from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import Toast from 'react-native-root-toast'
import {Context} from '@app/context'
import PositiveButton from '@base/views/positiveButton'
import {logout} from '@screens/main/welcome/repository'
import dimens from '@resources/dimens'
import colors from '@resources/colors'
import strings from '@resources/strings'

const WelcomeScreen = () => {
  const {setLoading, setIsLoggedIn} = useContext(Context)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <PositiveButton
          title={strings.welcome.logout}
          onPress={() => {
            setLoading(true)
            logout()
              .then(() => {
                setLoading(false)
                setIsLoggedIn(false)
              })
              .catch(e => {
                setLoading(false)
                Toast.show(`${e}`)
              })
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    height: dimens.matchParent,
    backgroundColor: colors['light/white-snow'],
  },
  root: {
    height: dimens.matchParent,
  },
})

export default WelcomeScreen

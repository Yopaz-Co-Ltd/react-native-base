import {NavigationContainer} from '@react-navigation/native'
import MainNavigator from '@app/navigation/main/MainNavigator'
import AuthNavigator from '@app/navigation/auth/AuthNavigator'
import {StyleSheet, View} from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import appSelectors from '@app/redux/app/AppSelector'
import Dimens from '@resources/Dimens'
import LoadingView from '@base/views/loading/LoadingView'
import AuthSelector from '@app/redux/auth/AuthSelector'
import AuthActions from '@app/redux/auth/AuthActions'

const AppNavigator = (): JSX.Element => {
    const dispatch = useDispatch()

    const accessToken = useSelector(AuthSelector.getLocalAccessToken)
    const isLoading = useSelector(appSelectors.getIsLoading)

    useEffect(() => {
        dispatch(AuthActions.loadAccessToken())
    }, [dispatch])

    useEffect(() => {
        console.log('accessToken = ' + JSON.stringify(accessToken))
    }, [accessToken])

    return (
        <View style={styles.root}>
            <NavigationContainer fallback={<LoadingView isLoading={true} />}>
                {accessToken ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            <LoadingView isLoading={isLoading} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {height: Dimens.matchParent},
})

export default AppNavigator

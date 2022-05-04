import {NavigationContainer} from '@react-navigation/native'
import MainNavigator from '@screens/main/MainNavigator'
import AuthNavigator from '@screens/auth/AuthNavigator'
import {View} from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import appSelectors from '@screens/AppSelector'
import Dimens from '@resources/Dimens'
import LoadingView from '@base/views/loading/LoadingView'
import AuthSelector from '@screens/auth/AuthSelector'
import AuthActions from '@screens/auth/AuthActions'

const AppNavigator = () => {
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
        <View style={{height: Dimens.matchParent}}>
            <NavigationContainer fallback={<LoadingView isLoading={true} />}>
                {accessToken ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            <LoadingView isLoading={isLoading} />
        </View>
    )
}

export default AppNavigator

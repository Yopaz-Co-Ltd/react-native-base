import {Dispatch} from 'redux'
import Api from '@base/api/Api'
import Strings from '@resources/localization/Strings'
import appActions from '@screens/AppAction'
import Toast from 'react-native-root-toast'

const types = {
    //LOGOUT is used to clear main state when logout
    LOGOUT: 'LOGOUT',
    SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE: 'SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE',
}

const loadAccessToken = () => {
    return async (dispatch: Dispatch) => {
        try {
            const accessToken = await Api.getAccessToken()
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: accessToken})
        } catch (e) {
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: undefined})
        }
    }
}

const login = (email?: string, password?: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(appActions.setIsLoading(true))
        try {
            const response = await Api.callApi({
                method: 'post',
                path: Api.PATHS.login,
                body: {
                    email: email,
                    password: password,
                },
            })
            const accessToken = response.data.accessToken
            dispatch({type: types.LOGOUT})
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: accessToken})
            dispatch(appActions.setIsLoading(false))
            await Api.saveAccessToken(accessToken)
        } catch (e: any) {
            console.log(e)
            dispatch(appActions.setIsLoading(false))
            if (e?.response?.data?.message && e.response.status === Api.StatusCode.AUTHORIZATION) {
                Toast.show(e?.response?.data?.message ?? '')
            } else {
                Toast.show(Strings.login.loginFailedMessage ?? '')
            }
        }
    }
}

const logout = () => {
    return async (dispatch: Dispatch) => {
        dispatch(appActions.setIsLoading(true))
        try {
            await Api.callApi({
                method: 'delete',
                path: Api.PATHS.logout,
            })
        } catch (e) {
        } finally {
            await Api.removeAccessToken()
            dispatch({type: types.LOGOUT})
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: undefined})
            dispatch(appActions.setIsLoading(false))
        }
    }
}

const actions = {
    types,
    login,
    logout,
    loadAccessToken,
}

export default actions

import {Dispatch} from 'redux'
import Api from '@api/Api'
import Strings from '@resources/localization/Strings'
import AppAction from '@app/redux/app/AppAction'
import Toast from 'react-native-root-toast'
import axios, {AxiosResponse} from 'axios'
import {BaseResponseModel} from '@api/models/BaseResponseModel'
import AuthPaths from '@api/paths/auth/AuthPaths'
import {LoginResponseModel} from '@api/models/login/LoginResponseModel'

const types = {
    //LOGOUT is used to clear main state when logout
    LOGOUT: 'LOGOUT',
    SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE: 'SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE',
    TEST_PERSIST: 'TEST_PERSIST',
}

const loadAccessToken = () => {
    return async (dispatch: Dispatch) => {
        try {
            const accessToken = (await Api.getAccessToken()) as string
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: accessToken})
        } catch (e) {
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: undefined})
        }
    }
}

// todo remove fake function
const testPersist = () => {
    return {type: types.TEST_PERSIST}
}

const login = (email?: string, password?: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(AppAction.setIsLoading(true))
        try {
            const loginResponseModel = await Api.callApi<LoginResponseModel>({
                method: 'post',
                path: AuthPaths.login,
                body: {
                    email: email,
                    password: password,
                },
            })
            const accessToken = loginResponseModel?.accessToken
            dispatch(AppAction.setIsLoading(false))
            if (accessToken) {
                dispatch({type: types.LOGOUT})
                dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: accessToken})
                await Api.saveAccessToken(accessToken)
            } else {
                Toast.show(Strings.login.loginFailedMessage ?? '')
            }
        } catch (e) {
            dispatch(AppAction.setIsLoading(false))
            if (axios.isAxiosError(e)) {
                const response = e?.response as AxiosResponse<BaseResponseModel<LoginResponseModel>>
                const data = response?.data
                const message = data?.message
                const status = response?.status
                if (message && status === Api.StatusCode.AUTHORIZATION) {
                    Toast.show(message ?? '')
                } else {
                    Toast.show(Strings.login.loginFailedMessage ?? '')
                }
                return
            }
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Toast.show(`${e}`)
        }
    }
}

const logout = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(AppAction.setIsLoading(true))
        try {
            await Api.callApi({
                method: 'delete',
                path: AuthPaths.logout,
            })
        } catch (e) {
            console.log(e)
        } finally {
            await Api.removeAccessToken()
            dispatch({type: types.LOGOUT})
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: undefined})
            dispatch(AppAction.setIsLoading(false))
        }
    }
}

const actions = {
    types,
    login,
    logout,
    loadAccessToken,
    testPersist,
}

export default actions

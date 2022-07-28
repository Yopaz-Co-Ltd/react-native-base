/* eslint-disable @typescript-eslint/no-empty-function */
import {Dispatch} from 'redux'
import Api from '@base/api/Api'
import Strings from '@resources/localization/Strings'
import AppAction from '@app/redux/app/AppAction'
import Toast from 'react-native-root-toast'
import axios, {AxiosError} from 'axios'
import {BaseResponseModel} from '@base/api/BaseResponseModel'

const types = {
    //LOGOUT is used to clear main state when logout
    LOGOUT: 'LOGOUT',
    SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE: 'SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE',
    TEST_PERSIST: 'TEST_PERSIST',
}

const loadAccessToken = () => {
    return (dispatch: Dispatch) => {
        try {
            Api.getAccessToken()
                .then(accessToken => {
                    dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: accessToken})
                })
                .catch(() => {
                    dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: undefined})
                })
        } catch (e) {
            dispatch({type: types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE, payload: undefined})
        }
    }
}

const testPersist = () => {
    return (dispatch: Dispatch) => {
        dispatch({type: types.TEST_PERSIST})
    }
}

type LoginResponseModel = {
    accessToken?: string
}

const login = (email?: string, password?: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(AppAction.setIsLoading(true))
        try {
            const loginResponseModel = await Api.callApi<LoginResponseModel>({
                method: 'post',
                path: Api.PATHS.login,
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
                Api.saveAccessToken(accessToken).catch(() => {})
            } else {
                Toast.show(Strings.login.loginFailedMessage ?? '')
            }
        } catch (e) {
            dispatch(AppAction.setIsLoading(false))
            if (axios.isAxiosError(e)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const error: AxiosError<BaseResponseModel<LoginResponseModel>> = e
                const message = error?.response?.data?.message
                const status = error?.response?.status
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
                path: Api.PATHS.logout,
            })
        } catch (e) {
            console.log(e)
        } finally {
            Api.removeAccessToken().catch(() => {})
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

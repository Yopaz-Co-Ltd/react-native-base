import {Dispatch} from 'redux'
import {Alert} from 'react-native'
import Strings from '@resources/localization/Strings'

const types = {
    SET_IS_LOADING: 'SET_IS_LOADING',
    SHOW_ERROR: 'SHOW_ERROR',
}

const setIsLoading = (isLoading: boolean): any => {
    return async (dispatch: Dispatch) => {
        dispatch({type: types.SET_IS_LOADING, payload: isLoading})
    }
}

const showError = (message: string): any => {
    return async () => {
        Alert.alert(Strings.error, message)
    }
}

const actions = {
    types,
    setIsLoading,
    showError,
}

export default actions

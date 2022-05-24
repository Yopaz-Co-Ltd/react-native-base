import {AnyAction} from 'redux'

const types = {
    SET_IS_LOADING: 'SET_IS_LOADING',
    SHOW_ERROR: 'SHOW_ERROR',
}

const setIsLoading = (isLoading: boolean): AnyAction => {
    return {type: types.SET_IS_LOADING, payload: isLoading}
}

const showError = (message: string): AnyAction => {
    return {type: types.SHOW_ERROR, payload: message}
}

const actions = {
    types,
    setIsLoading,
    showError,
}

export default actions

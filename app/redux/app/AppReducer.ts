import actions from '@app/redux/app/AppAction'
import {AnyAction} from 'redux'
import {Alert} from 'react-native'
import Strings from '@resources/localization/Strings'

export type AppState = {
    isLoading: boolean
}

const initialState: AppState = {
    isLoading: false,
}

const AppReducer = (state: AppState = initialState, action: AnyAction): AppState => {
    switch (action.type) {
        case actions.types.SET_IS_LOADING:
            return {
                ...state,
                isLoading: typeof action.payload === 'boolean' ? action.payload : state.isLoading,
            }
        case actions.types.SHOW_ERROR:
            if (typeof action.payload === 'string') {
                Alert.alert(Strings.error, action.payload)
            }
            return state
        default:
            return state
    }
}

export default AppReducer

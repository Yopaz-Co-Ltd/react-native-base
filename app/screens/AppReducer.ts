import actions from '@screens/AppAction'
import {AnyAction} from 'redux'

export type AppState = {
    isLoading: boolean
}

const initialState: AppState = {
    isLoading: false,
}

const AppReducer = (state: AppState = initialState, action: AnyAction): any => {
    switch (action.type) {
        case actions.types.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state
    }
}

export default AppReducer

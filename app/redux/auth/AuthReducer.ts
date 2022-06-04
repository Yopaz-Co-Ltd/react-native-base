import actions from '@app/redux/auth/AuthActions'
import {AnyAction} from 'redux'

export type AuthState = {
    accessToken?: string
}

const initialState: AuthState = {
    accessToken: undefined,
}

const AuthReducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
    switch (action.type) {
        case actions.types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE:
            return {
                ...state,
                accessToken: typeof action.payload === 'string' ? action.payload : undefined,
            }
        default:
            return state
    }
}

export default AuthReducer

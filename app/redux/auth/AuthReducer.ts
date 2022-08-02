import actions from '@app/redux/auth/AuthActions'
import {AnyAction} from 'redux'

export type AuthState = {
    accessToken?: string
    // todo remove fake function
    user: {
        name: string
        age: number
    }
}

const initialState: AuthState = {
    accessToken: undefined,
    // todo remove fake function
    user: {
        name: 'john',
        age: 25,
    },
}

const AuthReducer = (state: AuthState = initialState, action: AnyAction): AuthState => {
    switch (action.type) {
        case actions.types.SET_LOADED_ACCESS_TOKEN_IN_REDUX_STORE:
            return {
                ...state,
                accessToken: typeof action.payload === 'string' ? action.payload : undefined,
            }

        // todo remove fake function
        case actions.types.TEST_PERSIST:
            return {
                ...state,
                user: {
                    name: state.user.name + '1',
                    age: state.user.age + 1,
                },
            }
        default:
            return state
    }
}

export default AuthReducer

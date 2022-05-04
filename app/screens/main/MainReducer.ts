import {AnyAction, combineReducers} from 'redux'
import actions from '@screens/auth/AuthActions'
import WelcomeReducer from '@screens/main/welcome/WelcomeReducer'

const Reducer = combineReducers({
    welcome: WelcomeReducer,
})

const MainReducer = (state: any, action: AnyAction) => {
    if (action.type === actions.types.LOGOUT) {
        return Reducer(undefined, action)
    }
    return Reducer(state, action)
}

export default MainReducer

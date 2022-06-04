import {AnyAction, combineReducers} from 'redux'
import actions from '@app/redux/auth/AuthActions'
import WelcomeReducer, {WelcomeState} from '@app/redux/main/welcome/WelcomeReducer'

export interface MainState {
    welcome: WelcomeState
}

const MainCombineReducers = combineReducers({
    welcome: WelcomeReducer,
})

const MainReducer = (state: MainState, action: AnyAction): MainState => {
    if (action.type === actions.types.LOGOUT) {
        return MainCombineReducers(undefined, action)
    }
    return MainCombineReducers(state, action)
}

export default MainReducer

import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import AuthReducer, {AuthState} from '@screens/auth/AuthReducer'
import AppReducer, {AppState} from '@screens/AppReducer'
import MainReducer, {MainState} from '@screens/main/MainReducer'
import {PersistConfig} from 'redux-persist/es/types'
import {ReduxStorage} from '@base/local-storage/LocalStorage'

export interface RootState {
    app: AppState
    auth: AuthState
    main: MainState
}

const authPersistConfig: PersistConfig<AuthState> = {
    key: 'auth',
    storage: ReduxStorage,
    blacklist: [],
}

const RootReducer = combineReducers({
    app: AppReducer,
    auth: persistReducer(authPersistConfig, AuthReducer),
    main: MainReducer,
})

export default RootReducer

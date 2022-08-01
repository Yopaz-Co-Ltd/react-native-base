import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import AuthReducer, {AuthState} from '@app/redux/auth/AuthReducer'
import AppReducer, {AppState} from '@app/redux/app/AppReducer'
import MainReducer, {MainState} from '@app/redux/main/MainReducer'
import {PersistConfig} from 'redux-persist/es/types'
import {LocalStorage} from '@base/local-storage/LocalStorage'

export interface RootState {
    app: AppState
    auth: AuthState
    main: MainState
}

const authPersistConfig: PersistConfig<AuthState> = {
    key: 'auth',
    storage: LocalStorage,
    blacklist: [],
}

const RootReducer = combineReducers({
    app: AppReducer,
    auth: persistReducer(authPersistConfig, AuthReducer),
    main: MainReducer,
})

export default RootReducer

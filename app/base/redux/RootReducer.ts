import {combineReducers} from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistReducer} from 'redux-persist'
import AuthReducer from '@screens/auth/AuthReducer'
import {store} from '@base/redux/ConfigureStore'
import AppReducer from '@screens/AppReducer'
import MainReducer from '@screens/main/MainReducer'

export type RootState = ReturnType<typeof store.getState>

const authPersistConfig: any = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: [],
}

const RootReducer = combineReducers<RootState>({
    app: AppReducer,
    auth: persistReducer(authPersistConfig, AuthReducer),
    main: MainReducer,
})

export default RootReducer

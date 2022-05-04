import {applyMiddleware, createStore, Store} from 'redux'
import thunk from 'redux-thunk'
import {persistStore} from 'redux-persist'
import RootReducer from '@base/redux/RootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {Persistor} from 'redux-persist/es/types'

const middlewares = [thunk]

const store: Store = createStore(RootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)))

const persistor: Persistor = persistStore(store)

export {store, persistor}

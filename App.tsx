import React from 'react'
import {Provider} from 'react-redux'
import {persistor, store} from '@base/redux/ConfigureStore'
import {PersistGate} from 'redux-persist/integration/react'
import AppNavigator from '@screens/AppNavigator'

//todo re-config firebase crashlytics

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppNavigator />
            </PersistGate>
        </Provider>
    )
}

export default App

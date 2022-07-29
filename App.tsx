/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {persistor, store} from '@app/redux/ConfigureStore'
import {PersistGate} from 'redux-persist/integration/react'
import AppNavigator from '@app/navigation/AppNavigator'
import {decryptData, encryptData} from '@app/base/common/EncryptionUtils'
import {ReduxStorage} from '@app/base/local-storage/LocalStorage'

//todo re-config firebase crashlytics

const App = (): JSX.Element => {
    const data = [
        {
            id: 1,
            name: 'John Doe',
            age: 28,
        },
        {
            id: 2,
            name: 'John Doe',
            age: 28,
        },
    ]

    useEffect(() => {
        const testEncrypt = encryptData(data)
        const testDecrypt = decryptData(testEncrypt)
        console.log('testEncrypt', testEncrypt)
        console.log('testDecrypt', testDecrypt)
        ReduxStorage.setItemString('@key1', 'data string').catch(() => {})
        ReduxStorage.setItem('@key2', data).catch(() => {})
    })

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppNavigator />
            </PersistGate>
        </Provider>
    )
}

export default App

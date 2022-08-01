/* eslint-disable @typescript-eslint/no-empty-function */
import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {persistor, store} from '@app/redux/ConfigureStore'
import {PersistGate} from 'redux-persist/integration/react'
import AppNavigator from '@app/navigation/AppNavigator'
import {decryptData, encryptData} from '@app/base/common/EncryptionUtils'
import {LocalStorage} from '@app/base/local-storage/LocalStorage'
import Constants from '@app/base/common/Constants'

//todo re-config firebase crashlytics

const App = (): JSX.Element => {
    // todo remove fake function
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
        // todo remove fake function
        const testEncrypt = encryptData(data)
        const testDecrypt = decryptData(testEncrypt)
        console.log('testEncrypt', testEncrypt)
        console.log('testDecrypt', testDecrypt)
        LocalStorage.setItem('@key1', 'data string', Constants.TYPE_DATA_STRING).catch(() => {})
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

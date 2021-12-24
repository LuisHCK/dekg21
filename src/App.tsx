import React from 'react'
import { Provider } from 'react-redux'
import AppRouter from 'router'
import { store } from 'store'

function App(): React.ReactElement {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}

export default App

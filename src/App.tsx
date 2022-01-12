import React from 'react'
import { Provider } from 'react-redux'
import AppRouter from 'router'
import { store } from 'store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App(): React.ReactElement {
    return (
        <Provider store={store}>
            <AppRouter />
            <ToastContainer />
        </Provider>
    )
}

export default App

import { ROUTER_PATHS } from 'app-constants/router-paths'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const LogoutPage = (): React.ReactElement => {
    useEffect(() => {
        Cookies.remove('tokenExpiration')
        Cookies.remove('authToken')
    }, [])

    return <Redirect to={ROUTER_PATHS.LOGIN} />
}

export default LogoutPage

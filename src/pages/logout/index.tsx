import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { ROUTER_PATHS } from 'app-constants/router-paths'
import { AUTH_CLEAN_REQUEST_STATUS } from 'store/actions/auth'
import { GET_AUTH_STATE } from 'store/selectors/auth'

const LogoutPage = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { user } = useSelector(GET_AUTH_STATE)

    useEffect(() => {
        dispatch(AUTH_CLEAN_REQUEST_STATUS())
    }, [dispatch])

    if (user) {
        return <Spinner animation="border" />
    }

    return <Redirect to={ROUTER_PATHS.LOGIN} />
}

export default LogoutPage

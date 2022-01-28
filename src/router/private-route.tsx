import { ROUTER_PATHS } from 'app-constants/router-paths'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { GET_AUTH_STATE } from 'store/selectors/auth'

type TProps = RouteProps & {
    children: React.ReactNode
}

const PrivateRoute = ({ children, ...rest }: TProps): React.ReactElement => {
    const { user } = useSelector(GET_AUTH_STATE)

    const isAuthenticated = !!user?.id

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTER_PATHS.LOGIN,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute

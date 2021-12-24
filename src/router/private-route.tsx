import { ROUTER_PATHS } from 'app-constants/router-paths'
import useAuth from 'hooks/useAuth'
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

type TProps = RouteProps & {
    children: React.ReactNode
}

const PrivateRoute = ({ children, ...rest }: TProps): React.ReactElement => {
    const isAuthenticated = useAuth()

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

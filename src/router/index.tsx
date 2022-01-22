import AppLayout from 'components/layout'
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './private-route'
import APP_ROUTES from './routes'

const AppRouter = (): React.ReactElement => {
    const getRouteKey = (path: string | string[]): string => {
        if (typeof path === 'object') {
            return path[0]
        }

        return path
    }

    return (
        <React.Suspense fallback={<span>Cargando...</span>}>
            <Router>
                <Switch>
                    {APP_ROUTES.filter((route) => route.isPublic).map((route) => (
                        <Route
                            key={`public-route${getRouteKey(route.path)}`}
                            path={route.path}
                            exact={route.exact}
                        >
                            <route.component />
                        </Route>
                    ))}

                    <Route path="/">
                        <AppLayout>
                            {APP_ROUTES.filter((route) => !route.isPublic).map((route) => (
                                <PrivateRoute
                                    key={`private-route${getRouteKey(route.path)}`}
                                    path={route.path}
                                    exact={route.exact}
                                >
                                    <route.component />
                                </PrivateRoute>
                            ))}
                        </AppLayout>
                    </Route>
                </Switch>
            </Router>
        </React.Suspense>
    )
}

export default AppRouter

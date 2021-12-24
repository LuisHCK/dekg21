import AppLayout from 'components/layout'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './private-route'
import APP_ROUTES from './routes'

const AppRouter = (): React.ReactElement => {
    return (
        <React.Suspense fallback={<span>Cargando...</span>}>
            <Router>
                <Switch>
                    {APP_ROUTES.filter((route) => route.isPublic).map((route) => (
                        <Route
                            key={`public-route${route.path}`}
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
                                    key={`private-route${route.path}`}
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

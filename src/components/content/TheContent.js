import React, { Suspense } from 'react'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
// routes config
import routes from '../../routes'
import ProtectRouter from '../../routes/ProtectRouter'
import PublicRouter from '../../routes/PublicRouter'

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const TheContent = () => {
    return (
        <main>
            <Suspense fallback={loading}>
                <Switch>
                    {routes.map((route, idx) => {
                        if (route.auth) {
                            return (
                                <ProtectRouter
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component}
                                >
                                </ProtectRouter>
                            );
                        }
                        return (
                            <PublicRouter
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                component={route.component}
                            />
                        );
                    })}
                </Switch>
            </Suspense>
        </main>
    )
}

export default React.memo(TheContent)

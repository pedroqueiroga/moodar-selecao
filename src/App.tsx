import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import ActionDetail from './components/ActionDetail';
import Nav from './components/Nav';
import Profile from './components/Profile';
import SearchPage from './components/SearchPage';

import { GlobalStateProvider } from './store/ActionsStore';

function App() {
    return (
        <GlobalStateProvider>
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/profile" />
                        </Route>
                        <Route path="/search" exact component={SearchPage} />
                        <Route
                            path={['/actions/:id', '/actions/:id/:slug']}
                            exact
                            component={ActionDetail}
                        />
                        <Route path="/profile" component={Profile} />
                        <Route path="*" exact component={() => <h1>404</h1>}
                        />
                    </Switch>
                </div>
            </Router>
        </GlobalStateProvider>
    );
}

export default App;

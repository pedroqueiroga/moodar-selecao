import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './components/Nav';
import SearchPage from './components/SearchPage';
import ActionDetail from './components/ActionDetail';

function App() {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/search" exact component={SearchPage} />
                    <Route path={['/actions/:id', '/actions/:id/:slug']} exact component={ActionDetail} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './components/Nav';
import SearchPage from './components/SearchPage';

function App() {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/search" exact component={SearchPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

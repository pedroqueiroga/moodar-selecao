import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './Nav';

function App() {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

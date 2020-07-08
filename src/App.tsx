import React, { useReducer, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './components/Nav';
import SearchPage from './components/SearchPage';
import ActionDetail from './components/ActionDetail';
import {
    TActionsState,
    actionsInitialState,
    ActionsStateContext,
    DispatchStateContext
} from './store/ActionsStore';


function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        (state: TActionsState, newValue: TActionsState) => (
            { ...state, ...newValue }
        ),
        actionsInitialState,
    );
    return (
        <ActionsStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </ActionsStateContext.Provider>
    );
}

function App() {
    return (
        <GlobalStateProvider>
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/search" exact component={SearchPage} />
                        <Route
                            path={['/actions/:id', '/actions/:id/:slug']}
                            exact
                            component={ActionDetail}
                        />
                    </Switch>
                </div>
            </Router>
        </GlobalStateProvider>
    );
}

export default App;

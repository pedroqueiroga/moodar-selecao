import React, { createContext, useContext, useReducer, Context, ReactNode } from 'react';
import { Set } from 'immutable';

export type TActionsState = { actions: Set<number> } // store the id only
export const actionsInitialState: TActionsState = { actions: Set() };

export const ActionsStateContext = createContext(actionsInitialState);
export const DispatchStateContext: Context<any> = createContext(undefined);

export function useGlobalState(): [TActionsState, any] {
    return [
        useContext(ActionsStateContext),
        useContext(DispatchStateContext)
    ];
}

export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        (state: TActionsState, newValue: TActionsState) => (
            { ...state, ...newValue }
        ),
        actionsInitialState,
    );
    return (
        <ActionsStateContext.Provider value={state} >
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </ActionsStateContext.Provider>
    );
}


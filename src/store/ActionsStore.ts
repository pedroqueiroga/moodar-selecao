import { createContext, Context } from 'react';

export type TActionsState = { actions: number[] } // store the id only
export const actionsInitialState: TActionsState = { actions: [] };

export const ActionsStateContext = createContext(actionsInitialState);
export const DispatchStateContext: Context<any> = createContext(undefined);


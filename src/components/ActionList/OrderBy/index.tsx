import React from 'react';

import { List } from 'immutable';

import styles from './OrderBy.module.css';
import ActionModel from '../../../models/ActionModel';


export type TOrderByOption = {
    value: keyof ActionModel | 'name',
    text: string
};

type TOrderBy = {
    dispatch: any,
    defaultValue: string,
    options: List<TOrderByOption>,
    isDescend: boolean,
};

export type TOrderByReducerState = {
    sortAttr: keyof ActionModel | 'name',
    reverse: boolean
}

export type TOrderByReducerAction =
    | { type: 'reverse' }
    | { type: 'sort_attribute', payload: keyof ActionModel | 'name' }

export function OrderByReducer(state: TOrderByReducerState, action: TOrderByReducerAction): TOrderByReducerState {
    switch (action.type) {
        case 'reverse':
            return { ...state, reverse: !state.reverse };
        case 'sort_attribute':
            return { sortAttr: action.payload, reverse: false };
        default:
            throw new Error('Invalid action type');
    }
}

function OrderBy({
    dispatch,
    defaultValue,
    options,
    isDescend,
}: TOrderBy) {

    function onReverseHandler() {
        dispatch({ type: 'reverse' });
    }

    function onSelectHandler(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch({ type: 'sort_attribute', payload: e.currentTarget.value });
    }

    return (
        <div>
            <span>Ordenar por </span>
            <select
                className={styles.ordering}
                onChange={onSelectHandler}
                defaultValue={defaultValue}
            >
                {options.map((opt, idx) =>
                    <option key={idx} value={opt.value}>{opt.text}</option>
                )}
            </select>

            <input
                className={styles.reverse}
                type="button"
                id="toggleReverse"
                onClick={onReverseHandler}
                value={
                    isDescend ?
                        '▼' :
                        '▲'
                }
            />
        </div>
    );
}

export default OrderBy;

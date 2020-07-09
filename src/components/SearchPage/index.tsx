import React, { useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Set } from 'immutable';

import ActionList from '../ActionList';
import { fetchActionsByAttrs } from '../../services/api';
import FilterBox from './FilterBox';
import { Category } from '../../models/ActionModel';
import Box from '../Box';

import styles from './SearchPage.module.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export type TState = { capacity: number | undefined, duration: number | undefined, categories: Set<Category> };

function reducer(state: TState, action: any) {
    switch (action.type) {
        case 'include_cat':
            return {
                ...state,
                categories: state.categories.add(action.payload)
            };
        case 'remove_cat':
            return {
                ...state,
                categories: state.categories.delete(action.payload)
            };
        case 'change_capacity':
            return { ...state, capacity: action.payload };
        case 'change_duration':
            return { ...state, duration: action.payload };
        default:
            throw new Error('Undefined type of action');
    }
}

function SearchPage() {
    const initialState: TState = {
        capacity: undefined,
        duration: undefined,
        categories: Set()
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('queries', queries);
        console.log('state', state);
    })

    const queries = Set(useQuery().get("q")?.trim().replace(/ +/g, ' ')
        .split(' ')
        .filter(query => query.length > 0) || []);

    const actions = fetchActionsByAttrs(
        queries,
        state.categories,
        state.capacity
    );
    const resultP = (queries.size > 0) ?
        (
            <p>{
                actions.size === 0 ?
                    (`Nenhum resultado para: ${queries?.join(' ')}`) :
                    (`Resultado${actions.size > 1 ?
                        's' :
                        ''} para: ${queries?.join(' ')}`)
            }</p>
        ) :
        null;
    return (
        <div className={styles.body}>
            <div className={styles.filter}>
                <Box
                    title="Filtrar ações"
                >
                    <FilterBox changeFilters={dispatch} />
                </Box>
            </div>
            <div className={styles.el}>
                <Box
                    title="Ações disponíveis"
                >
                    {resultP}
                    <ActionList actions={actions} />
                </Box>
            </div>
        </div>
    );
}

export default SearchPage;

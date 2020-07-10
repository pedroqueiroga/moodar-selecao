import React, { useReducer, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Set, List } from 'immutable';

import ActionList from '../ActionList';
import { fetchActionsByAttrs } from '../../services/api';
import FilterBox, { TFilterState, filterReducer } from './FilterBox';
import Box from '../Box';

import styles from './SearchPage.module.css';
import OrderBy, { OrderByReducer } from '../ActionList/OrderBy';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const initialState: TFilterState = {
        capacity: undefined,
        duration: undefined,
        categories: Set()
    };

    const sortInitialState = { sortAttr: 'name', reverse: false };

    const [state, dispatch] = useReducer(filterReducer, initialState);

    const [sortState, sortDispatch] = useReducer(
        OrderByReducer,
        sortInitialState
    );

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
        state.capacity,
        sortState.sortAttr,
        sortState.reverse,
    );

    const noResult = queries.size > 0 ? ` para: ${queries?.join(' ')}` : '';

    const cleanQueries = queries.size > 0 ?
        (<p>
            <Link to="/search">
                Limpar busca.
                                            </Link>
        </p>) :
        null;

    const resultP = (
        <p>{
            actions.size === 0 ?
                (`Nenhum resultado${noResult}.`) :
                (queries.size > 0 ?
                    (`Resultado${
                        actions.size > 1 ?
                            's' :
                            ''
                        } para: ${queries?.join(' ')} `) :
                    null)
        }</p>
    );

    const messageP = (
        actions.size === 0 ?
            <p>Tente remover filtros ou buscar outros termos.</p> :
            null
    );

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
                    <div className={styles.listHeader}>
                        {resultP}
                        {messageP}
                        {cleanQueries}
                        <OrderBy
                            className={styles.listHeaderRight}
                            defaultValue={sortInitialState.sortAttr}
                            options={List([
                                { value: 'name', text: 'Nome' },
                                { value: 'duration', text: 'Duração' },
                                { value: 'capacity', text: 'Audiência' },
                            ])}
                            dispatch={sortDispatch}
                            isDescend={sortState.reverse}
                        />
                    </div>
                    <ActionList actions={actions} />
                </Box>
            </div>
        </div>
    );
}

export default SearchPage;

import React, { useReducer, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Set, List } from 'immutable';

import ActionList from '../ActionList';
import { fetchActionsByAttrs } from '../../services/api';
import FilterBox, { TFilterState, filterReducer } from './FilterBox';
import Box from '../Box';

import styles from './SearchPage.module.css';
import OrderBy, { OrderByReducer } from '../ActionList/OrderBy';
import Header from '../ActionList/Header';
import ActionModel from '../../models/ActionModel';

function SearchPage({ location }: { location: any }) {
    const [initialIndex, setInitialIndex] = useState(1);
    const [endIndex, setEndIndex] = useState(NaN);

    const [resultState, setResultState] = useState({
        result: List<ActionModel>(),
        nEntries: NaN,
    });

    const [queries, setQueries] = useState(Set<string>());

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
        console.log('state', state);
    })

    useEffect(() => {
        const loc = location.search.slice(location.search.indexOf('q=') + 2);
        const cleanLoc = loc?.trim().replace(/ +/g, ' ');
        setQueries(
            Set(cleanLoc
                .split(' ')
                .filter((query: []) => query.length > 0) || [])
        );
    }, [location]);

    useEffect(() => {
        console.log('state, sortState or queries changed');
        console.log(state, sortState, queries);
        const { result, nEntries } = fetchActionsByAttrs(
            queries,
            state.categories,
            state.capacity,
            state.duration?.min,
            state.duration?.max,
            sortState.sortAttr,
            sortState.reverse,
            initialIndex - 1,
            initialIndex + (resultsPerPage - 1),
        );
        setResultState({ result, nEntries });
        setEndIndex(initialIndex + result.size - 1);
    }, [state, sortState, queries, initialIndex]);

    useEffect(() => {
        console.log('component did mount');
    }, []);

    const { result: actions, nEntries } = resultState;

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

    const resultsPerPage = 10;

    const orderByComponent = (
        <OrderBy
            defaultValue={sortInitialState.sortAttr}
            options={List([
                { value: 'name', text: 'Nome' },
                { value: 'duration', text: 'Duração' },
                { value: 'capacity', text: 'Audiência' },
            ])}
            dispatch={sortDispatch}
            isDescend={sortState.reverse}
        />
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
                    </div>
                    {actions.size > 0 ?
                        (
                            <div>
                                <Header
                                    initialIndex={initialIndex}
                                    endIndex={endIndex}
                                    listLength={nEntries}
                                    prevPageCallBack={() =>
                                        setInitialIndex(initialIndex - resultsPerPage)
                                    }
                                    nextPageCallBack={() =>
                                        setInitialIndex(initialIndex + resultsPerPage)
                                    }
                                    orderBy={orderByComponent}
                                />
                                <ActionList actions={actions} />
                            </div>
                        ) : null}
                </Box>
            </div>
        </div>
    );
}

export default SearchPage;

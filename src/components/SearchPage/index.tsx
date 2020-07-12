import React, { useReducer, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Location } from 'history';

import { Set, List } from 'immutable';

import ActionList from '../ActionList';
import { fetchActionsByAttrs } from '../../services/api';
import FilterBox, { TFilterState, filterReducer } from './FilterBox';
import Box from '../Box';

import styles from './SearchPage.module.css';
import OrderBy, { OrderByReducer, TOrderByReducerState, TOrderByOption } from '../ActionList/OrderBy';
import Header from '../ActionList/Header';
import ActionModel from '../../models/ActionModel';
import { TSearchPageState } from '../ActionList/ActionItem';

type TProps = { location: Location }

function SearchPage({ location }: TProps) {
    let initialIndexState = 1;
    let initialFilterState: TFilterState = {
        capacity: NaN,
        duration: { min: NaN, max: NaN },
        categories: Set<string>(),
    };
    let initialSortState: TOrderByReducerState = {
        sortAttr: 'name',
        reverse: false,
    };
    if (location.state !== undefined) {
        const {
            initialIndex,
            nEntries,
            sortState,
            filterState,
        } = location.state as TSearchPageState;
        initialIndexState = (initialIndex <= nEntries) ? initialIndex : 1;
        initialFilterState = filterState;
        initialSortState = sortState;
    }
    const [initialIndex, setInitialIndex] = useState(initialIndexState);
    const [endIndex, setEndIndex] = useState(NaN);

    const [resultState, setResultState] = useState({
        result: List<ActionModel>(),
        nEntries: NaN,
    });

    const [queries, setQueries] = useState(Set<string>());

    const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);

    const [sortState, sortDispatch] = useReducer(
        OrderByReducer,
        initialSortState
    );

    useEffect(() => {
        const loc = location.search.slice(location.search.indexOf('q=') + 2);
        const cleanLoc = loc?.trim().replace(/ +/g, ' ');
        setQueries(
            Set(cleanLoc
                .split(' ')
                .filter(query => query.length > 0) || [])
        );
    }, [location]);

    useEffect(() => {
        const { result, nEntries } = fetchActionsByAttrs(
            queries,
            filterState.categories,
            filterState.capacity,
            filterState.duration?.min,
            filterState.duration?.max,
            sortState.sortAttr,
            sortState.reverse,
            initialIndex - 1,
            initialIndex + (resultsPerPage - 1),
        );
        setResultState({ result, nEntries });
        setEndIndex(initialIndex + result.size - 1);
    }, [filterState, sortState, queries, initialIndex]);

    useEffect(() => {
        if (resultState.result.size === 0 && resultState.nEntries > 0) {
            setInitialIndex(1);
        }
    }, [resultState]);

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
            defaultValue={initialSortState.sortAttr}
            options={List([
                { value: 'title', text: 'Título' },
                { value: 'category', text: 'Categoria' },
                { value: 'duration', text: 'Duração' },
                { value: 'capacity', text: 'Audiência' },
            ] as TOrderByOption[])}
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
                    <FilterBox
                        initialState={filterState}
                        changeFilters={filterDispatch}
                    />
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
                                <ActionList
                                    wholePageState={{
                                        tag: 'search',
                                        search: location.search,
                                        filterState: { ...filterState },
                                        sortState: { ...sortState },
                                        initialIndex,
                                        nEntries,
                                    } as TSearchPageState}
                                    actions={actions}
                                />
                            </div>
                        ) : null}
                </Box>
            </div>
        </div>
    );
}

export default SearchPage;

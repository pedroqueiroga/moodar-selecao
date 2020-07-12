import React, { useReducer, useState, useEffect } from 'react';
import { Location } from 'history';

import { List } from 'immutable';

import ActionList from '../ActionList';
import { useGlobalState } from '../../store/ActionsStore';
import { fetchActionsByIds } from '../../services/api';
import styles from './Profile.module.css';
import Box from '../Box';
import OrderBy, { OrderByReducer, TOrderByReducerState, TOrderByOption } from '../ActionList/OrderBy';
import Header from '../ActionList/Header';
import ActionModel from '../../models/ActionModel';
import { TProfilePageState } from '../ActionList/ActionItem';

type TProps = { location: Location };

function Profile({ location }: TProps) {
    const [state] = useGlobalState();

    let initialIndexState = 1;
    let initialSortState: TOrderByReducerState = {
        sortAttr: 'name',
        reverse: false,
    };

    if (location.state !== undefined) {
        const {
            initialIndex,
            nEntries,
            sortState,
        } = location.state as TProfilePageState;
        initialIndexState = (initialIndex <= nEntries) ? initialIndex : 1;
        initialSortState = sortState;
    }

    const [initialIndex, setInitialIndex] = useState(initialIndexState);
    const [endIndex, setEndIndex] = useState(NaN);

    const [resultState, setResultState] = useState({
        result: List<ActionModel>(),
        nEntries: NaN,
    });

    const [sortState, dispatch] = useReducer(OrderByReducer, initialSortState);

    useEffect(() => {
        console.log('state, sortState or queries changed');
        const { result, nEntries } = fetchActionsByIds(
            state.actions,
            sortState.sortAttr,
            sortState.reverse,
            initialIndex - 1,
            initialIndex + (resultsPerPage - 1),
        );
        setResultState({ result, nEntries });
        setEndIndex(initialIndex + result.size - 1);
    }, [state, sortState, initialIndex]);

    const orderByComponent = (
        <OrderBy
            defaultValue={initialSortState.sortAttr}
            options={List([
                { value: 'title', text: 'Título' },
                { value: 'category', text: 'Categoria' },
                { value: 'duration', text: 'Duração' },
                { value: 'capacity', text: 'Audiência' },
            ] as TOrderByOption[])}
            dispatch={dispatch}
            isDescend={sortState.reverse}
        />
    );

    const { result: actions, nEntries } = resultState;

    const resultsPerPage = 10;

    return (
        <div className={styles.main}>
            <h2>Olá, empresa.</h2>
            <Box title="Ações solicitadas">
                {actions.size > 0 ?
                    (<div>
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
                                tag: 'profile',
                                sortState: { ...sortState },
                                initialIndex,
                                nEntries,
                            } as TProfilePageState}
                            actions={actions} />
                    </div>) :
                    <p>Nenhuma ação solicitada.</p>
                }
            </Box>
        </div>
    );
}

export default Profile;

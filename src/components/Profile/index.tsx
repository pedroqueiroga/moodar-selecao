import React, { useReducer, useState, useEffect } from 'react';

import { List } from 'immutable';

import ActionList from '../ActionList';
import { useGlobalState } from '../../store/ActionsStore';
import { fetchActionsByIds } from '../../services/api';
import styles from './Profile.module.css';
import Box from '../Box';
import OrderBy, { OrderByReducer, TOrderByReducerState } from '../ActionList/OrderBy';
import Header from '../ActionList/Header';
import ActionModel from '../../models/ActionModel';

function Profile() {
    const [state] = useGlobalState();

    const initialState: TOrderByReducerState = {
        sortAttr: 'name',
        reverse: false,
    };

    const [initialIndex, setInitialIndex] = useState(1);
    const [endIndex, setEndIndex] = useState(NaN);

    const [resultState, setResultState] = useState({
        result: List<ActionModel>(),
        nEntries: NaN,
    });

    const [sortState, dispatch] = useReducer(OrderByReducer, initialState);

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
            defaultValue={initialState.sortAttr}
            options={List([
                { value: 'name', text: 'Nome' },
                { value: 'duration', text: 'Duração' },
                { value: 'capacity', text: 'Audiência' },
            ])}
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
                        < ActionList actions={actions} />
                    </div>) :
                    <p>Nenhuma ação solicitada.</p>
                }

            </Box>
        </div>
    );
}

export default Profile;

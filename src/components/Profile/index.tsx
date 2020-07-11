import React, { useReducer } from 'react';

import { List } from 'immutable';

import ActionList from '../ActionList';
import { useGlobalState } from '../../store/ActionsStore';
import { fetchActionsByIds } from '../../services/api';
import styles from './Profile.module.css';
import Box from '../Box';
import OrderBy, { OrderByReducer, TOrderByReducerState } from '../ActionList/OrderBy';
import Header from '../ActionList/Header';

function Profile() {
    const [state] = useGlobalState();

    const initialState: TOrderByReducerState = {
        sortAttr: 'name',
        reverse: false,
    };

    const [sortState, dispatch] = useReducer(OrderByReducer, initialState);

    const actions = fetchActionsByIds(
        state.actions,
        sortState.sortAttr,
        sortState.reverse
    );

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

    return (
        <div className={styles.main}>
            <h2>Olá, empresa.</h2>
            <Box title="Ações solicitadas">
                {actions.size > 0 ?
                    (<div>
                        <Header
                            initialIndex={1}
                            endIndex={50}
                            listLength={actions.size}
                            prevPageCallBack={() => console.log('hi')}
                            nextPageCallBack={() => console.log('hi')}
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

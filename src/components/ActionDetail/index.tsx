import React, { useReducer } from 'react';
import { Link, Redirect, useParams, useLocation } from 'react-router-dom';

import classNames from 'classnames';

import Action from './Action';
import { fetchActionById } from '../../services/api';

import styles from './ActionDetail.module.css';
import buttonStyles from '../Button.module.css';

import Box from '../Box/';
import { TWholePageState } from '../ActionList/ActionItem';

export type TReducerAction = {
    type: 'increase' | 'decrease',
}

function ActionDetail() {
    const { id, slug } = useParams();
    const location = useLocation();
    const wholePageState = (location.state as TWholePageState) || undefined;

    const [nEntries, nEntriesDispatch] = useReducer(
        (state: number, action: TReducerAction): number => {
            switch (action.type) {
                case 'increase':
                    return state + 1;
                case 'decrease':
                    return state - 1;
                default:
                    throw new Error('invalid action type');
            }
        }, wholePageState.nEntries);

    const toObj = wholePageState?.tag === 'search' ?
        {
            pathname: '/search',
            search: wholePageState.search,
            state: { ...wholePageState } as TWholePageState,
        } :
        {
            pathname: '/profile',
            state: { ...wholePageState, nEntries } as TWholePageState,
        }

    const backButton = wholePageState === undefined ? null :
        (<div className={styles.container}>
            <Link
                to={toObj}
                className={classNames(
                    buttonStyles.button,
                    styles.button,
                )}
            />
        </div>
        );

    try {
        const action = fetchActionById(parseInt(id));
        if (action.slug !== slug) {
            return <Redirect to={{
                pathname: `/actions/${action.id}/${action.slug}`,
                state: { ...wholePageState },
            }} />;
        }
        return (
            <div>
                {backButton}
                <Box>
                    <Action
                        canceledCallBack={nEntriesDispatch}
                        action={action} />
                </Box >
            </div >

        );
    } catch (e) {
        return <Redirect to="/404" />
    }
}

export default ActionDetail;

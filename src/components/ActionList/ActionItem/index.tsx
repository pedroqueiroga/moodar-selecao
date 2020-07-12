import React from 'react';
import { Link } from 'react-router-dom';
import ActionModel from '../../../models/ActionModel';

import styles from './ActionItem.module.css';
import { TFilterState } from '../../SearchPage/FilterBox';
import { TOrderByReducerState } from '../OrderBy';

type ActionItemProp = {
    action: ActionModel,
    wholePageState?: TWholePageState,
};

export type TWholePageState = TSearchPageState | TProfilePageState;

export type TSearchPageState = {
    tag: 'search',
    search: string,
    filterState: TFilterState,
    sortState: TOrderByReducerState,
    initialIndex: number,
    nEntries: number,
}
export type TProfilePageState = {
    tag: 'profile',
    sortState: TOrderByReducerState,
    initialIndex: number,
    nEntries: number,
}

function ActionItem({ action, wholePageState }: ActionItemProp) {
    return (
        <Link
            className={styles.link}
            to={{
                pathname: `actions/${action.id}/${action.slug}`,
                state: { ...wholePageState },
            }}
        >
            <p className={styles.line1}>{action.title} - {action.category}</p>
            <p
                className={styles.line2}
            >
                Duração: {action.duration} minutos. Audiência de até {action
                    .capacity} pessoas.
            </p>
        </Link>
    )
}

export default ActionItem;

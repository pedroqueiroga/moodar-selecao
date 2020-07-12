import React from 'react';

import { List } from 'immutable';

import ActionItem, { TWholePageState } from './ActionItem';
import ActionModel from '../../models/ActionModel';

import styles from './ActionList.module.css';

type ActionListProps = {
    actions: List<ActionModel>,
    wholePageState?: TWholePageState,
};

function ActionList({ actions, wholePageState }: ActionListProps) {
    return (
        <ul className={styles.list}>
            {actions.map((a) =>
                <li
                    className={styles.item}
                    key={a.id}
                >
                    <ActionItem
                        wholePageState={wholePageState}
                        action={a}
                    />
                </li>)}
        </ul>
    );
}

export default ActionList;

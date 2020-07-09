import React from 'react';

import { List } from 'immutable';

import ActionItem from './ActionItem';
import ActionModel from '../../models/ActionModel';

import styles from './ActionList.module.css';

type ActionListProps = { actions: List<ActionModel> };

function ActionList({ actions }: ActionListProps) {
    return (
        <ul className={styles.list}>
            {actions.map((a) =>
                <li
                    className={styles.item}
                    key={a.id}
                >
                    <ActionItem action={a} />
                </li>)}
        </ul>
    );
}

export default ActionList;

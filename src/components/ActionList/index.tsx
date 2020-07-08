import React from 'react';

import { List } from 'immutable';

import ActionItem from './ActionItem';
import ActionModel from '../../models/ActionModel';

type ActionListProps = { actions: List<ActionModel> };

function ActionList({ actions }: ActionListProps) {
    return (
        <ul>
            {actions.map((a) => <li key={a.id}><ActionItem action={a} /></li>)}
        </ul>
    );
}

export default ActionList;

import React from 'react';

import ActionItem from './ActionItem';
import ActionModel from '../../models/ActionModel';

type ActionListProps = { actions: ActionModel[] };

function ActionList({ actions }: ActionListProps) {
    return (
        <ul>
            {actions.map((a, i) => <li key={i}><ActionItem action={a} /></li>)}
        </ul>
    );
}

export default ActionList;

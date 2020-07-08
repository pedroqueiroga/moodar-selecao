import React from 'react';

import ActionItem from './ActionItem';
import ActionModel from '../../models/ActionModel';

type ActionListProps = { actions: ActionModel[] };

function ActionList({ actions }: ActionListProps) {
    return (
        <ul>
            {actions.map((a) => <li key={a.id}><ActionItem action={a} /></li>)}
        </ul>
    );
}

export default ActionList;

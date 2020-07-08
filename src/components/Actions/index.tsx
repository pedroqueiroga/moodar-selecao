import React from 'react';

import Action from './Action';
import ActionModel from '../../models/ActionModel';

type ActionsProps = { actions: ActionModel[] };

function Actions({ actions }: ActionsProps) {
    return (
        <ul>
            {actions.map((a, i) => <li key={i}><Action action={a} /></li>)}
        </ul>
    );
}

export default Actions;

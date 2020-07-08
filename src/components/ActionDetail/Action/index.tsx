import React from 'react';

import ActionModel from '../../../models/ActionModel';

type ActionProp = { action: ActionModel };

function Action({ action }: ActionProp) {
    return (
        <div>
            <h1>{action.title}</h1>

            <p>{action.category}</p>
            <p>Capacidade: {action.capacity} pessoas.</p>
            <p>Duração: {action.duration} minutos.</p>

            <br />
            <p>{action.description}</p>
        </div>
    );
}

export default Action;

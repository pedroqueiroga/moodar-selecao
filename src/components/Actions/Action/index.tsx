import React from 'react';
import ActionModel from '../../../models/ActionModel';

type ActionProp = { action: ActionModel };

function Action({ action }: ActionProp) {
    return (
        <div>
            <p>{action.title} - {action.category}</p>
            <p>Duração: {action.duration} minutos. Audiência de até {action.capacity} pessoas.</p>
            <p>{action.description}</p>
        </div>
    )
}

export default Action;

import React from 'react';
import ActionModel from '../../../models/ActionModel';

type ActionItemProp = { action: ActionModel };

function ActionItem({ action }: ActionItemProp) {
    return (
        <div>
            <p>{action.title} - {action.category}</p>
            <p>Duração: {action.duration} minutos. Audiência de até {action.capacity} pessoas.</p>
        </div>
    )
}

export default ActionItem;

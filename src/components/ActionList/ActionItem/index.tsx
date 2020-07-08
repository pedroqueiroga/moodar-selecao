import React from 'react';
import { Link } from 'react-router-dom';
import ActionModel from '../../../models/ActionModel';

type ActionItemProp = { action: ActionModel };

function ActionItem({ action }: ActionItemProp) {
    return (
        <div>
            <Link to={`actions/${action.id}/${action.slug}`}><p>{action.title} - {action.category}</p></Link>
            <p>Duração: {action.duration} minutos. Audiência de até {action.capacity} pessoas.</p>
        </div >
    )
}

export default ActionItem;

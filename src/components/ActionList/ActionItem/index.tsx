import React from 'react';
import { Link } from 'react-router-dom';
import ActionModel from '../../../models/ActionModel';

import styles from './ActionItem.module.css';

type ActionItemProp = { action: ActionModel };

function ActionItem({ action }: ActionItemProp) {
    return (
        <Link
            className={styles.link}
            to={`actions/${action.id}/${action.slug}`}
        >
            <div>
                <p>{action.title} - {action.category}</p>
                <p>Duração: {action.duration} minutos. Audiência de até {action.capacity} pessoas.</p>
            </div >
        </Link>
    )
}

export default ActionItem;

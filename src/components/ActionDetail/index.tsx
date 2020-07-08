import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Action from './Action';
import { fetchActionById } from '../../services/api';

function ActionDetail() {
    const { id, slug } = useParams();
    try {
        const action = fetchActionById(parseInt(id));
        if (action.slug !== slug) {
            return <Redirect to={`/actions/${action.id}/${action.slug}`} />;
        }
        return <Action action={action} />;
    } catch (e) {
        return <Redirect to="/404" />
    }
}

export default ActionDetail;

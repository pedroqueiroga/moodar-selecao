import React from 'react';
import ActionList from '../ActionList';
import { useGlobalState } from '../../store/ActionsStore';
import { fetchActionsByIds } from '../../services/api';

function Profile() {
    const [state] = useGlobalState();
    const actions = fetchActionsByIds(state.actions);

    return (
        <div>
            <p>Olá, empresa</p>
            <p>Ações Solicitadas</p>
            <ActionList actions={actions} />
        </div>
    );
}

export default Profile;

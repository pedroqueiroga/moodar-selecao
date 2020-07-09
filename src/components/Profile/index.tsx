import React from 'react';
import ActionList from '../ActionList';
import { useGlobalState } from '../../store/ActionsStore';
import { fetchActionsByIds } from '../../services/api';
import { Link } from 'react-router-dom';

import styles from './Profile.module.css';
import Box from '../Box';

function Profile() {
    const [state] = useGlobalState();
    const actions = fetchActionsByIds(state.actions);

    return (
        <div className={styles.main}>
            <h2>Olá, empresa.</h2>
            <Link to="/search">
                Ver todas as ações disponíveis.
            </Link>
            <Box title="Ações solicitadas">
                {actions.size > 0 ?
                    (<ActionList actions={actions} />) :
                    <p>Nenhuma ação solicitada.</p>
                }

            </Box>
        </div>
    );
}

export default Profile;

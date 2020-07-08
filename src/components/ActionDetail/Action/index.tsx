import React, { useContext } from 'react';

import ActionModel from '../../../models/ActionModel';
import { useGlobalState } from '../../../store/ActionsStore';

type ActionProp = { action: ActionModel };

function Action({ action }: ActionProp) {
    const [state, dispatch] = useGlobalState();

    const isRequested = state.actions.some(id => id === action.id);
    const buttonText = `${isRequested ? 'Cancelar' : 'Solicitar'} Ação`

    const onClickHandler = () => {
        if (isRequested) {
            // cancel
            dispatch({
                actions: [...state.actions].filter(id => id !== action.id)
            });
        } else {
            // request
            dispatch({ actions: [...state.actions, action.id] });
        }
    };

    return (
        <div>
            <h1>{action.title}</h1>

            <p>{action.category}</p>
            <p>Capacidade: {action.capacity} pessoas.</p>
            <p>Duração: {action.duration} minutos.</p>
            <br />

            <p>{action.description}</p>
            <br />

            <input
                type="button"
                value={buttonText}
                onClick={onClickHandler}
            />
        </div>
    );
}

export default Action;

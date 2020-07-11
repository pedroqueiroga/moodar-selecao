import React from 'react';

import classNames from 'classnames';

import ActionModel from '../../../models/ActionModel';
import { useGlobalState } from '../../../store/ActionsStore';

import styles from './Action.module.css';
import buttonStyles from '../../Button.module.css'

type ActionProp = { action: ActionModel };

function Action({ action }: ActionProp) {
    const [state, dispatch] = useGlobalState();

    const isRequested = state.actions.some(id => id === action.id);
    const buttonText = `${isRequested ? 'Cancelar' : 'Solicitar'} Ação`

    const onClickHandler = () => {
        if (isRequested) {
            // cancel
            dispatch({ actions: state.actions.delete(action.id) });
        } else {
            // request
            dispatch({ actions: state.actions.add(action.id) });
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
                className={classNames(
                    buttonStyles.button,
                    styles.button,
                )}
                type="button"
                value={buttonText}
                onClick={onClickHandler}
            />
        </div>
    );
}

export default Action;

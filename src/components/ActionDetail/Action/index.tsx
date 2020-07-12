import React from 'react';

import classNames from 'classnames';

import ActionModel from '../../../models/ActionModel';
import { useGlobalState } from '../../../store/ActionsStore';

import styles from './Action.module.css';
import buttonStyles from '../../Button.module.css'

import { TReducerAction } from '../../ActionDetail';

type TProps = {
    action: ActionModel,
    canceledCallBack: React.Dispatch<TReducerAction>,
};

function Action({ action, canceledCallBack }: TProps) {
    const [state, dispatch] = useGlobalState();

    const isRequested = state.actions.some(id => id === action.id);
    const buttonText = `${isRequested ? 'Cancelar' : 'Solicitar'} Ação`

    const onClickHandler = () => {
        if (isRequested) {
            // cancel
            canceledCallBack({ type: 'decrease' });
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

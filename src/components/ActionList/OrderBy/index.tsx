import React from 'react';

import { List } from 'immutable';

import styles from './OrderBy.module.css';

type TOrderBy = {
    selectCallBack: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    reverseCallBack: (e: React.MouseEvent<HTMLInputElement>) => void,
    defaultValue: string,
    options: List<{ value: string, text: string }>,
    isDescend: boolean,
    className: string,
};

function OrderBy({
    selectCallBack,
    reverseCallBack,
    defaultValue,
    options,
    isDescend,
    className,
}: TOrderBy) {
    return (
        <div className={className}>
            <span>Ordenar por </span>
            <select
                className={styles.ordering}
                onChange={selectCallBack}
                defaultValue={defaultValue}
            >
                {options.map((opt, idx) =>
                    <option key={idx} value={opt.value}>{opt.text}</option>
                )}
            </select>

            <input
                className={styles.reverse}
                type="button"
                id="toggleReverse"
                onClick={reverseCallBack}
                value={
                    isDescend ?
                        '▼' :
                        '▲'
                }
            />
        </div>
    );
}

export default OrderBy;

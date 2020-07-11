import React from 'react';

import classNames from 'classnames';

import styles from './Header.module.css';
import buttonStyle from '../../Button.module.css';

type THeader = {
    listLength: number,
    initialIndex: number,
    endIndex: number,
    prevPageCallBack: (e: React.MouseEvent<HTMLInputElement>) => void,
    nextPageCallBack: (e: React.MouseEvent<HTMLInputElement>) => void,
    orderBy: JSX.Element,
};

function Header({
    listLength,
    initialIndex,
    endIndex,
    prevPageCallBack,
    nextPageCallBack,
    orderBy,
}: THeader) {

    return (
        <div className={styles.container}>
            <div
                className={styles.left}
            >
                <span>
                    {initialIndex}—{endIndex} de {listLength}
                </span>
                <div>
                    <input
                        className={classNames(
                            buttonStyle.button,
                            styles.button,
                        )}
                        type="button"
                        value="<"
                        disabled={initialIndex === 1}
                        onClick={prevPageCallBack}
                    />
                    <input
                        className={classNames(
                            buttonStyle.button,
                            styles.button,
                        )}
                        type="button"
                        value=">"
                        disabled={endIndex === listLength}
                        onClick={nextPageCallBack}
                    />
                </div>
            </div>
            <div className={styles.right}>
                {orderBy}
            </div>
        </div >
    );
}

export default Header;

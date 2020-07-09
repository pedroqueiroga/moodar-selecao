import React, { ReactNode } from 'react';

import styles from './Box.module.css';

type TBox = { children: ReactNode, title: string };

function Box({ children, title }: TBox) {
    return (
        <div className={styles.body}>
            <h3>{title}</h3>
            <div className={styles.children}>
                {children}
            </div>
        </div>
    );
}


export default Box;

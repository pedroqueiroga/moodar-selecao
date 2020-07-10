import React, { ReactNode } from 'react';

import styles from './Box.module.css';

type TBox = {
    children: ReactNode,
    title?: string,
    titleSize?: 1 | 2 | 3 | 4 | 5 | 6,
};

function Box({ children, title, titleSize = 3 }: TBox) {

    function sizeChooser(titleSize: 1 | 2 | 3 | 4 | 5 | 6) {
        switch (titleSize) {
            case 1:
                return (text: string) => <h1>{text}</h1>;
            case 2:
                return (text: string) => <h2>{text}</h2>;
            case 3:
                return (text: string) => <h3>{text}</h3>;
            case 4:
                return (text: string) => <h4>{text}</h4>;
            case 5:
                return (text: string) => <h5>{text}</h5>;
            case 6:
                return (text: string) => <h6>{text}</h6>;
        }
    }

    const titleH = title ?
        sizeChooser(titleSize)(title) :
        null;
    return (
        <div className={styles.body}>
            {titleH}
            <div className={styles.children}>
                {children}
            </div>
        </div>
    );
}


export default Box;

import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';

import classNames from 'classnames';

import styles from './Nav.module.css';

function Nav({ history }: { history: History }) {
    const [keywords, setKeywords] = useState('');

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.currentTarget.value);
    };

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            history.push(`/search?q=${keywords.trim()}`);
        }
    }

    return (
        <nav className={styles.nav}>
            <Link
                className={classNames(
                    styles.link,
                    styles.navItem,
                    styles.navButton,
                )}
                to={{
                    pathname: '/search'
                }}
            >
                Ações Disponíveis
            </Link>
            <div className={classNames(
                styles.navItem,
                styles.searchItem,
            )}
            >
                <input
                    className={styles.searchbar}
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={keywords}
                    onChange={handleKeywordChange}
                    onKeyUp={handleKeyUp}
                />
                <Link
                    className={styles.searchsubmit}
                    to={{
                        pathname: '/search',
                        search: `?q=${keywords.trim()}`
                    }}
                >
                </Link>
            </div>
            <Link
                className={classNames(
                    styles.link,
                    styles.navButton,
                    styles.navItem,
                )}
                to="/profile"
            >
                <span className={styles.line1}>
                    Olá, empresa.
                </span>
                <span className={styles.line2}>
                    Ver ações solicitadas
                </span>
            </Link>
        </nav>
    );
}

export default withRouter(Nav);

import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import styles from './Nav.module.css';

function Nav({ history }: { history: History }) {
    const [keywords, setKeywords] = useState('');

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.currentTarget.value);
    };

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            history.push(`/search/?q=${keywords.trim()}`);
        }
    }

    return (
        <nav>
            <div className={styles.searchbar}>
                <Link
                    className={styles.profile}
                    to={{
                        pathname: '/profile'
                    }}
                >
                    Perfil
                </Link>
                <input
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
                    Pesquisar
                </Link>
            </div>
        </nav>
    );
}

export default withRouter(Nav);

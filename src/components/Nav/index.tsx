import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
    const [keywords, setKeywords] = useState('');

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywords(e.currentTarget.value);
    };

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

export default Nav;

import React from 'react';
import { useLocation } from 'react-router-dom';

import ActionList from '../ActionList';
import { fetchActionsByNames } from '../../services/api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    let keywords = useQuery().get("q")?.trim().replace(/ +/g, ' ').split(' ');
    if (keywords && keywords[0] === '') {
        keywords = undefined;
    }
    const actions = fetchActionsByNames(keywords);
    const resultP = keywords ?
        (
            <p>{
                actions.length === 0 ?
                    (`Nenhum resultado para: ${keywords?.join(' ')}`) :
                    (`Resultado${actions.length > 1 ?
                        's' :
                        ''} para: ${keywords?.join(' ')}`)
            }</p>
        ) :
        null;
    return (
        <div>
            {resultP}
            <ActionList actions={actions} />
        </div>
    );
}


export default SearchPage;

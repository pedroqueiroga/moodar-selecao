import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Actions from '../Actions';
import { fetchActions } from '../../services/api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    let keywords = useQuery().get("q")?.trim().replace(/ +/g, ' ').split(' ');
    if (keywords && keywords[0] === '') {
        keywords = undefined;
    }
    const actions = fetchActions(keywords)

    return (
        <div>
            {keywords ?
                (<p>Resultado{actions.length > 1 ? 's' : ''} para: {keywords.join(' ')}</p>)
                : null
            }
            <Actions actions={actions} />
        </div>
    );
}


export default SearchPage;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchActions } from '../../services/api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const query = useQuery().get("q");
    const actions = fetchActions(query?.replace(/ +/g, " ").split(' '));
    return (
        <div>
            <ul>
                {actions.map((a, i) => <li key={i}>{JSON.stringify(a)}</li>)}
            </ul>
        </div>
    );
}


export default SearchPage;

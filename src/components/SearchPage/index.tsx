import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Actions from '../Actions';
import { fetchActions } from '../../services/api';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const query = useQuery().get("q");
    const actions = fetchActions(query?.replace(/ +/g, " ").split(' '));
    return (
        <div>
            <Actions actions={actions} />
        </div>
    );
}


export default SearchPage;

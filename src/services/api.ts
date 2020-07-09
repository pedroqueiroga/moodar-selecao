import { Set, List } from 'immutable';

import ActionModel, { compareActionsByName, compareActionsByCapacity, compareActionsByDuration } from '../models/ActionModel';
import allActions from './ActionList';

function normalizeString(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

export function fetchActionsByAttrs(
    titlesCategories: Set<string> = Set(),
    mustHaveCats: Set<string> = Set(),
    maximumCapacity: number = NaN,
    sortedBy?: string
): List<ActionModel> {
    const cleanTcs = titlesCategories.map(tc => normalizeString(tc));
    const cleanMHC = mustHaveCats.map(cat => normalizeString(cat));
    const filteredActions = allActions.filter(action => {
        const cleanActionTitle = normalizeString(action.title);
        const cleanActionCat = normalizeString(action.category);

        const containsMHC = cleanMHC.size === 0 ||
            cleanMHC.find(cat => cleanActionCat.includes(cat));
        const containsTc = cleanTcs.size === 0 ||
            cleanTcs.find(tc => cleanActionTitle.includes(tc));
        const respectsMaximumCap = isNaN(maximumCapacity) ||
            (action.capacity <= maximumCapacity);

        return containsTc && containsMHC && respectsMaximumCap;
    });

    switch (sortedBy) {
        case 'name':
            return filteredActions.sort(compareActionsByName);
        case 'capacity':
            return filteredActions.sort(compareActionsByCapacity);
        case 'duration':
            return filteredActions.sort(compareActionsByDuration);
        default:
            return filteredActions;
    }
}

export function fetchActionsByIds(ids: Set<number>): List<ActionModel> {
    return allActions.filter(action => ids.includes(action.id));
}

export function fetchActionById(id: number): ActionModel {
    const action = allActions.find(action => id === action.id);
    if (!action) {
        throw new Error('invalid id');
    }
    return action;
}

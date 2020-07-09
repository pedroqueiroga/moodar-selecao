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
    sortBy?: string,
    reverse: boolean = false,
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

    return sortBy ?
        sortActions(filteredActions, sortBy, reverse) :
        filteredActions;
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

export function sortActions(
    actions: List<ActionModel>,
    sortedBy: string,
    reverse: boolean = false,
): List<ActionModel> {
    const compare = (cmp: Function) =>
        (a: ActionModel, b: ActionModel) =>
            reverse ? (-1) * cmp(a, b) : cmp(a, b);

    switch (sortedBy) {
        case 'name':
            return actions.sort(compare(compareActionsByName));
        case 'capacity':
            return actions.sort(compare(compareActionsByCapacity));
        case 'duration':
            return actions.sort(compare(compareActionsByDuration));
        default:
            throw new Error('Invalid sort function');
    }
}

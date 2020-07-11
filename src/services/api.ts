import { Set, List } from 'immutable';

import ActionModel, { compareActionsByName, compareActionsByCapacity, compareActionsByDuration } from '../models/ActionModel';
import allActions from './ActionList';

function normalizeString(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

type TFetchResult = {
    result: List<ActionModel>,
    nEntries: number,
};

export function fetchActionsByAttrs(
    titlesCategories: Set<string> = Set(),
    mustHaveCats: Set<string> = Set(),
    maximumCapacity: number = NaN,
    minimumDuration: number = NaN,
    maximumDuration: number = NaN,
    sortBy?: string,
    reverse: boolean = false,
    initialIndex?: number,
    endIndex?: number,
): TFetchResult {
    const cleanTcs = titlesCategories.map(tc => normalizeString(tc));
    const cleanMHC = mustHaveCats.map(cat => normalizeString(cat));
    const filteredActions = allActions.filter(action => {
        const cleanActionTitle = normalizeString(action.title);
        const cleanActionCat = normalizeString(action.category);

        const containsMHC = cleanMHC.size === 0 ||
            cleanMHC.find(cat => cleanActionCat.includes(cat));
        const containsTc = cleanTcs.size === 0 ||
            cleanTcs.find(tc => cleanActionTitle.includes(tc) ||
                cleanActionCat.includes(tc));
        const respectsMaximumCap = isNaN(maximumCapacity) ||
            (action.capacity <= maximumCapacity);
        const inDurationRange = (isNaN(minimumDuration) ||
            (action.duration >= minimumDuration)) && (isNaN(maximumDuration) ||
                (action.duration <= maximumDuration))

        return containsTc &&
            containsMHC &&
            respectsMaximumCap &&
            inDurationRange;
    });

    const allHits = sortBy ?
        sortActions(filteredActions, sortBy, reverse) :
        filteredActions;

    const result = allHits.slice(initialIndex, endIndex);

    return { result, nEntries: allHits.size };
}

export function fetchActionsByIds(
    ids: Set<number>,
    sortBy?: string,
    reverse: boolean = false,
    initialIndex?: number,
    endIndex?: number,
): TFetchResult {
    const filteredActions = allActions.filter(action => ids.includes(action.id));

    const allHits = sortBy ?
        sortActions(filteredActions, sortBy, reverse) :
        filteredActions;
    const result = allHits.slice(initialIndex, endIndex);

    return { result, nEntries: allHits.size }
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

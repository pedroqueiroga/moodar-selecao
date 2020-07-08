import { Set, List } from 'immutable';

import ActionModel from '../models/ActionModel';
import allActions from './ActionList';

function normalizeString(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

function compareActions(a: ActionModel, b: ActionModel): number {
    return ((a.title < b.title) ||
        ((a.title === b.title) && a.category <= b.category)) ? -1 : 1;
}

export function fetchActionsByNames(
    titlesCategories: Set<string> = Set(),
    mustHaveCats: Set<string> = Set(),
): List<ActionModel> {
    const cleanTcs = titlesCategories.map(tc => normalizeString(tc));
    const cleanMHC = mustHaveCats.map(cat => normalizeString(cat));
    return allActions.filter(action => {
        const cleanActionTitle = normalizeString(action.title);
        const cleanActionCat = normalizeString(action.category);

        const containsMHC = cleanMHC.size === 0 ||
            cleanMHC.find(cat => cleanActionCat.includes(cat));
        const containsTc = cleanTcs.size === 0 ||
            cleanTcs.find(tc => cleanActionTitle.includes(tc));

        return containsTc && containsMHC;
    }).sort(compareActions);
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

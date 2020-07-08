import ActionModel from '../models/ActionModel';
import allActions from './ActionList';

export function fetchActions(
    titlesCategories: string[] = []
): ActionModel[] {
    if (titlesCategories.length === 0) {
        return allActions.slice();
    } else {
        return allActions.filter(action => {
            for (const tc of titlesCategories) {
                const cleanTc = tc
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase();
                if (action.title.toUpperCase().includes(cleanTc) ||
                    action.category.toUpperCase().includes(cleanTc)) {
                    return true;
                }
            }
            return false;
        });
    }
}

export function fetchAction(id: number): ActionModel {
    const action = allActions.find(action => id === action.id);
    if (!action) {
        throw new Error('invalid id');
    }
    return action;
}

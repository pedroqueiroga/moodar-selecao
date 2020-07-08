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
                if (action.title.toUpperCase().includes(tc.toUpperCase()) ||
                    action.category.toUpperCase().includes(tc.toUpperCase())) {
                    return true;
                }
            }
            return false;
        });
    }
}

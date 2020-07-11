interface ActionModel {
    id: number,
    title: string,
    slug: string,
    description: string,
    category: Category,
    duration: number,
    capacity: number
};

export function compareActionsByName(a: ActionModel, b: ActionModel): number {
    return ((a.title < b.title) ||
        ((a.title === b.title) && a.category <= b.category)) ? -1 : 1;
}

export function compareActions(attr: keyof ActionModel) {
    return (a: ActionModel, b: ActionModel) => {
        return (a[attr] <= b[attr]) ? -1 : 1;
    }
}

export type TCategory = { [s: string]: string }

export enum Category {
    WebinarOnline = "Webinar Online",
    PalestraPresencial = "Palestra Presencial",
    Treinamento = "Treinamento"
}

export default ActionModel;

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

export function compareActionsByDuration(a: ActionModel, b: ActionModel): number {
    return (a.duration < b.duration) ? -1 : 1;
}

export function compareActionsByCapacity(a: ActionModel, b: ActionModel): number {
    return (a.capacity < b.capacity) ? -1 : 1;
}

export type TCategory = { [s: string]: string }

export enum Category {
    WebinarOnline = "Webinar Online",
    PalestraPresencial = "Palestra Presencial",
    Treinamento = "Treinamento"
}

export default ActionModel;

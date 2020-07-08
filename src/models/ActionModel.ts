interface ActionModel {
    title: string,
    description: string,
    category: Category,
    duration: number,
    capacity: number
};

export enum Category {
    WebinarOnline = "webinar online",
    PalestraPresencial = "palestra presencial",
    Treinamento = "treinamento"
}

export default ActionModel;

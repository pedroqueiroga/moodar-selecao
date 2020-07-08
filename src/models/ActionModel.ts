interface ActionModel {
    id: number,
    title: string,
    slug: string,
    description: string,
    category: Category,
    duration: number,
    capacity: number
};

export enum Category {
    WebinarOnline = "Webinar Online",
    PalestraPresencial = "Palestra Presencial",
    Treinamento = "Treinamento"
}

export default ActionModel;

import ActionModel, { Category } from '../models/ActionModel';
import { List } from 'immutable';

const loremIpsum = 'Aliquam congue ligula sit amet metus fringilla, eget pellentesque quam condimentum. Donec justo ante, molestie ut nunc et, vehicula feugiat felis. Integer consectetur massa leo, eu venenatis libero cursus non. Suspendisse convallis nulla at risus vehicula lacinia. Curabitur nec magna non magna tristique tempus. Proin tristique posuere faucibus. Vestibulum erat massa, eleifend vitae risus quis, pharetra cursus lacus. Ut fringilla, est in suscipit rhoncus, ipsum justo luctus dui, non porttitor arcu est quis lorem. Duis hendrerit bibendum velit, ut gravida ex molestie facilisis. Nullam ullamcorper elit quam, vitae molestie odio eleifend ac. Phasellus ut mattis urna.Praesent id sodales dui.Integer sem purus, egestas eget eleifend sit amet, posuere eu velit.Quisque faucibus nibh in ex pellentesque, sed maximus ligula rutrum.Nunc in lorem a quam blandit laoreet.Mauris vehicula, risus at efficitur feugiat, diam dui bibendum mauris, non mollis nunc elit vitae magna.Suspendisse potenti.Integer elit est, feugiat.';

const allActions: List<ActionModel> = List([
    {
        id: 1,
        title: 'Como lidar com a Covid',
        slug: 'como-lidar-com-covid',
        description: loremIpsum,
        category: Category.WebinarOnline,
        duration: 120,
        capacity: 10
    },
    {
        id: 2,
        title: 'Gestão e liderança',
        slug: 'gestao-e-lideranca',
        description: loremIpsum,
        category: Category.Treinamento,
        duration: 600,
        capacity: 25
    },
    {
        id: 3,
        title: 'Auto-cuidado emocional',
        slug: 'auto-cuidado-emocional',
        description: loremIpsum,
        category: Category.PalestraPresencial,
        duration: 90,
        capacity: 100
    },
    {
        id: 4,
        title: 'Worklife balance',
        slug: 'worklife-balance',
        description: loremIpsum,
        category: Category.PalestraPresencial,
        duration: 60,
        capacity: 100
    },
]);

export default allActions;

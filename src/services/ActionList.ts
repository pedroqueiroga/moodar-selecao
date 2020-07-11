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
        capacity: 10,
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
        capacity: 100,
    },
    {
        id: 4,
        title: 'Worklife balance',
        slug: 'worklife-balance',
        description: loremIpsum,
        category: Category.PalestraPresencial,
        duration: 60,
        capacity: 100,
    },
    {
        id: 5,
        title: 'Ansiedade e Depressão',
        slug: 'ansiedade-depressao',
        description: loremIpsum,
        category: Category.PalestraPresencial,
        duration: 30,
        capacity: 20,
    },
    {
        id: 6,
        title: 'Como Lidar com Estresse',
        slug: 'como-lidar-com-estresse',
        description: loremIpsum,
        category: Category.Treinamento,
        duration: 450,
        capacity: 10,
    },
    {
        id: 7,
        title: 'Comunicação Não Violenta',
        slug: 'comunicacao-nao-violenta',
        description: loremIpsum,
        category: Category.WebinarOnline,
        duration: 30,
        capacity: 100,
    },
    {
        id: 8,
        title: 'Amor e Amizade',
        slug: 'amor-amizade',
        description: loremIpsum,
        category: Category.WebinarOnline,
        duration: 45,
        capacity: 200,
    },
]);

const takenIds = [1, 2, 3, 4, 5, 6, 7, 8];

function choose(l: List<any>) {
    return l.get(Math.floor(Math.random() * l.size));
}

const alphabet = List('abcdefghijklmnopqrstuvwxyz'.split(''));

function randomWord() {
    let result = choose(alphabet).toUpperCase();
    while (true) {
        if (result.length > 4 &&
            Math.random() < 0.5) {
            return result;
        } else {
            result += choose(alphabet)
        }
    }
}

function randomTitle() {
    let result = randomWord();
    while (true) {
        if (Math.random() < 0.4) {
            return result;
        } else {
            result += ` ${randomWord()}`;
        }
    }
}

function slugify(s: string) {
    return s.replace(/ /g, '-').toLowerCase();
}

function randomAction(): ActionModel {
    let takeId = 0;
    while (takenIds.includes(takeId)) {
        takeId = Math.round(Math.random() * 1000);
    }
    takenIds.push(takeId);
    const title = randomTitle();
    const category = Category[
        choose(List(Object.keys(Category))) as keyof typeof Category
    ];
    return {
        capacity: Math.round(Math.random() * 100),
        category,
        description: loremIpsum,
        duration: Math.round(Math.random() * 600),
        id: takeId,
        slug: slugify(title),
        title,
    }
}

function randomActions() {
    const actions = [randomAction()];
    while (true) {
        if (Math.random() < 0.05) {
            return actions
        } else {
            actions.push(randomAction());
        }
    }
}

const moreActions = allActions.concat(List(randomActions()));

export default moreActions;

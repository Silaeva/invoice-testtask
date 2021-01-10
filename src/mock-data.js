import {nanoid} from "nanoid";

const BUYERS_COUNT = 23;
const NAMES = ['Невилл', 'Седрик', 'Аргус', 'Сириус', 'Сибилла', 'Волдеморт', 'Беллатриса', 'Гарри', 'Аластор', 'Гермиона', 'Драко',
'Рональд', 'Минерва', 'Римус', 'Альбус Персиваль Вулфрик Брайан Дамблдор', 'Гораций', 'Северус'];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomItem = (items) => {
  return items[getRandomInteger(0, items.length - 1)];
};

const generaBuyerInfo = () => {
  return {
    id: nanoid(5),
    name: getRandomItem(NAMES),
    average_check: getRandomInteger(15, 250),
    purchases_number: getRandomInteger(1, 20),
    total_billing: getRandomInteger(350, 2500)
  };
};

const mockBuyers = new Array(BUYERS_COUNT).fill().map(generaBuyerInfo);

export {mockBuyers};

const DESCRIPTION = [
  'Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10',
  'Описание 11', 'Описание 12', 'Описание 13', 'Описание 14', 'Описание 15', 'Описание 16', 'Описание 17', 'Описание 18',
  'Описание 19', 'Описание 20', 'Описание 21', 'Описание 22', 'Описание 23', 'Описание 24', 'Описание 25',
];

const NAMES = [
  'Иван',
  'Артем',
  'Игорь',
  'Александр',
  'Анастасия',
  'Лидия',
  'Петр',
  'Фавронья',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    // if (previousValues.length >= (max - min + 1)) {
    //   console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    //   return null;
    // }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// const createMessage = (count, array) => {
//   let message = '';
//   if (count === 1) {
//     message = array[getRandomInteger(0, array.length - 1)];
//   } else {
//     message = `${array[getRandomInteger(0, array.length - 1)]} ${createMessage(count - 1, array)}`;
//   }
//   return message;
// };

// Создание сообщения через цикл
const createMessage = (count, array) => {
  const message = [];
  for(let i = 0; i <= count - 1; i++) {
    message[i] = array[getRandomInteger(0, array.length - 1)];
  }
  return message.join(' ');
};

const PHOTO_POST_COUNT = 25;
const createIdPhoto = createIdGenerator();
const createIdComment = createIdGenerator();
const randomAdressIndex = createUniqueId(1, PHOTO_POST_COUNT);

function createCommentPost () {
  const avatarName = getRandomInteger(1,6);
  const countMessage = getRandomInteger(1,2);

  return {
    id: createIdComment(),
    // avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    avatar: `img/avatar-${avatarName}.svg`,
    message: createMessage(countMessage, MESSAGES),
    // name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    name: NAMES[avatarName - 1]
  };
}

const createPhotoPost = () => {
  const AdressIndex = randomAdressIndex();

  return {
    id: createIdPhoto(),
    url: `photos/${AdressIndex}.jpg`,
    description: DESCRIPTION[AdressIndex - 1],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createCommentPost)
  };
};

const simularPhoto = Array.from({length: PHOTO_POST_COUNT}, createPhotoPost);

// eslint-disable-next-line no-console
console.table(simularPhoto);
// eslint-disable-next-line no-console
console.table(simularPhoto[0].comments);

const PHOTO_POST_COUNT = 25; // количество фото в посте
const COMMENT_MAX_COUNT = 30; // количество комментариев
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const AVATAR_MAX_COUNT = 6; // количество аватаров

const DESCRIPTION = [
  'Красивый пляж', 'Дорога к морю', 'Ах это море', 'А на море белый песок', 'Веселый обед', 'Клевая тачка', 'Плотный завтрак', 'Кому компотика?', 'Можно достать рукой', 'Организация простанства',
  'Шикарный вид', 'Машинка...', 'Полезный перекус', 'Суши с котом', 'Теплые носочки', 'Высоко', 'Хор', 'Красненькая',
  'Чтобы не споткнуться', 'Территория', 'А на ужин...', 'Красивый закат', 'Крабик', 'Концерт', 'Бегемот разинул рот...',
]; // описание фотографий

const NAMES = [
  'Иван',
  'Артем',
  'Игорь',
  'Александр',
  'Анастасия',
  'Лидия',
  'Петр',
  'Фавронья',
]; // имена коментаторов

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]; // варианты сообщений

// счетчик, создание уникальных id
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// генератор случайных чисел
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// генератор уникальных случайных чисел
const getUniqueRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//Функция для выбора случайного элемента из массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Фунцкия для создания сообщений
const createMessage = (count, array) => {
  const message = [];
  for(let i = 0; i <= count - 1; i++) {
    message[i] = getRandomArrayElement(array);
  }
  return message.join(' ');
};

const createIdPhoto = createIdGenerator(); // уникальные id для фотографий
const createIdComment = createIdGenerator(); // уникальные id для комментариев
const randomAdressIndex = getUniqueRandomId(1, PHOTO_POST_COUNT);

// функция для создания списка комментариев
const createCommentPost = () => ({
  id: createIdComment(),
  avatar: `img/avatar-${getRandomInteger(1,AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(getRandomInteger(1,2), MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// функция для создания массива с описанием фотографий
const createPhotoPost = () => {
  const adressPhoto = randomAdressIndex(); // номер фотографии, также используется для выбра описания для данной фотографии

  return {
    id: createIdPhoto(),
    url: `photos/${adressPhoto}.jpg`,
    description: DESCRIPTION[adressPhoto - 1],
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from({length: getRandomInteger(0, COMMENT_MAX_COUNT)}, createCommentPost)
  };
};

const simularPhoto = Array.from({length: PHOTO_POST_COUNT}, createPhotoPost);

// eslint-disable-next-line no-console
console.table(simularPhoto);

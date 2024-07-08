import {createIdGenerator, getRandomInteger, getRandomArrayElement} from './util.js';

const AVATAR_MAX_COUNT = 6; // количество аватаров

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

// Фунцкия для создания сообщений
const createMessage = (count, array) => {
  const message = [];
  for(let i = 0; i <= count - 1; i++) {
    message[i] = getRandomArrayElement(array);
  }
  return message.join(' ');
};

const createIdComment = createIdGenerator(); // уникальные id для комментариев

// функция для создания списка комментариев
const createCommentPost = () => ({
  id: createIdComment(),
  avatar: `img/avatar-${getRandomInteger(1,AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(getRandomInteger(1,2), MESSAGES),
  name: getRandomArrayElement(NAMES)
});

export {createCommentPost};

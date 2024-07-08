import {createIdGenerator, getRandomInteger, getUniqueRandomId} from './util.js';
import {createCommentPost} from './comments-generation.js';

const PHOTO_POST_COUNT = 25; // количество фото в посте
const COMMENT_MAX_COUNT = 30; // количество комментариев
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;

const DESCRIPTION = [
  'Красивый пляж', 'Дорога к морю', 'Ах это море', 'А на море белый песок', 'Веселый обед', 'Клевая тачка', 'Плотный завтрак', 'Кому компотика?', 'Можно достать рукой', 'Организация простанства',
  'Шикарный вид', 'Машинка...', 'Полезный перекус', 'Суши с котом', 'Теплые носочки', 'Высоко', 'Хор', 'Красненькая',
  'Чтобы не споткнуться', 'Территория', 'А на ужин...', 'Красивый закат', 'Крабик', 'Концерт', 'Бегемот разинул рот...',
]; // описание фотографий

const createIdPhoto = createIdGenerator(); // уникальные id для фотографий
const randomAdressIndex = getUniqueRandomId(1, PHOTO_POST_COUNT);

// функция для создания массива с описанием фотографий
const dataPostGenetation = () => {
  const adressPhoto = randomAdressIndex(); // номер фотографии, также используется для выбра описания для данной фотографии

  return {
    id: createIdPhoto(),
    url: `photos/${adressPhoto}.jpg`,
    description: DESCRIPTION[adressPhoto - 1],
    likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
    comments: Array.from({length: getRandomInteger(0, COMMENT_MAX_COUNT)}, createCommentPost)
  };
};

const simularPhotoList = () => Array.from({length: PHOTO_POST_COUNT}, dataPostGenetation);

export {simularPhotoList};

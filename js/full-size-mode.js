import {isEscapeKey} from './util.js';

const STEPVALUE = 5;
const thumbnails = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonClosePictire = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const shownCountComments = counterComments.querySelector('.social__comment-shown-count');

//функция для поочередного вывода списка комментариев
let countStep = 1;
const createCounterComments = () => {
  const commentsArray = commentsList.querySelectorAll('.social__comment');
  commentsArray.forEach((comment) => comment.classList.add('hidden'));
  loaderComments.classList.remove('hidden');
  counterComments.classList.remove('hidden');
  if (commentsArray.length <= STEPVALUE * countStep) {
    shownCountComments.textContent = commentsArray.length;
    commentsArray.forEach((comment) => comment.classList.remove('hidden'));
    loaderComments.classList.add('hidden');
  } else {
    shownCountComments.textContent = STEPVALUE * countStep;
    for (let i = 0; i < STEPVALUE * countStep; i++) {
      commentsArray[i].classList.remove('hidden');
    }
  }
};

const onButtonLoaderClick = () => {
  countStep++;
  createCounterComments();
};

// Заполнение поста данными
const createFullSizePicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  //для счетчика комментариев
  counterComments.querySelector('.social__comment-total-count').textContent = comments.length;

  commentsList.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);

    comment.querySelector('img').src = avatar;
    comment.querySelector('img').alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsList.append(comment);
  });
  createCounterComments();
};

// Функция для отображения поста с изображением
const openFullSizePost = () => {
  countStep = 1; // переменная для работы прокрутки комментариев
  bigPicture.classList.remove('hidden');
  counterComments.classList.add('hidden');
  loaderComments.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  loaderComments.addEventListener('click', onButtonLoaderClick);
};

// функция для скрытия поста
function closeFullSizePost() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  loaderComments.removeEventListener('click', onButtonLoaderClick);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePost();
  }
}

const generateFullSizePost = (array) => {
  const onThumbnailClick = (evt) => {
    if (evt.target.closest('a')) {
      evt.preventDefault();
      openFullSizePost();
      bigPicture.classList.remove('hidden');
      const id = Number(evt.target.closest('a').dataset.id);
      createFullSizePicture(array[array.findIndex((elem) => elem.id === id)]);
    }
  };

  thumbnails.addEventListener('click', onThumbnailClick);
  buttonClosePictire.addEventListener('click',closeFullSizePost);
};

export {generateFullSizePost};

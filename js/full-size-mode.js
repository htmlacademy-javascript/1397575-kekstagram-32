import {isEscapeKey} from './util.js';

const thumbnails = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonClosePictire = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');

// Заполнение поста данными
const createFullSizePicture = ({url, description, likes, comments}) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

  commentsList.innerHTML = '';

  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);

    comment.querySelector('img').src = avatar;
    comment.querySelector('img').alt = name;
    comment.querySelector('.social__text').textContent = message;
    commentsList.append(comment);
  });

};

// Функция для отображения поста с изображением
const openFullSizePost = () => {
  bigPicture.classList.remove('hidden');
  counterComments.classList.add('hidden');
  loaderComments.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

// функция для скрытия поста
const closeFullSizePost = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePost();
  }
}

const generateFullSizePost = (array) => {
  const onThumbnailClick = (evt) => {
    if (evt.target.closest('a')) {
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



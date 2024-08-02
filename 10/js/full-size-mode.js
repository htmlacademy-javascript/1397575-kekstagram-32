import {isEscapeKey} from './util.js';

const thumbnails = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const buttonClosePictire = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const counterComments = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const shownCountComments = counterComments.querySelector('.social__comment-shown-count');
const commentsListFragment = document.createDocumentFragment(); //для добавления комментариев
let showComments = 0;
let commentsArray = [];

// Заполнение поста данными
const createFullSizePicture = ({url, description, likes}) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

//функция для отрисовки каждого комментария
const createComment = ({avatar, name, message}) => {
  const comment = commentItem.cloneNode(true);

  comment.querySelector('img').src = avatar;
  comment.querySelector('img').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// функция для генерации комментариев
const renderComments = (comments) => {
  showComments += 5;

  if (showComments >= comments.length) {
    loaderComments.classList.add('hidden');
    showComments = comments.length;
  } else {
    loaderComments.classList.remove('hidden');
  }

  for (let i = 0; i < showComments; i++) {
    const item = createComment(comments[i]);
    commentsListFragment.append(item);
  }
  commentsList.innerHTML = '';
  commentsList.append(commentsListFragment);
  counterComments.querySelector('.social__comment-total-count').textContent = comments.length;
  shownCountComments.textContent = showComments;
};

const onButtonLoaderClick = () => {
  renderComments(commentsArray);
};

// Функция для отображения поста с изображением
const openFullSizePost = (data) => {
  bigPicture.classList.remove('hidden');
  loaderComments.classList.add('hidden');
  document.body.classList.add('modal-open');

  createFullSizePicture(data);
  commentsArray = data.comments;
  renderComments(commentsArray);

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClosePictire.addEventListener('click',closeFullSizePost);
  loaderComments.addEventListener('click', onButtonLoaderClick);
};

// функция для скрытия поста
function closeFullSizePost() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  showComments = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClosePictire.removeEventListener('click',closeFullSizePost);
  loaderComments.removeEventListener('click', onButtonLoaderClick);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePost();
  }
}

const generateFullSizePost = (data) => {
  const onThumbnailClick = (evt) => {
    const currentThumbnail = evt.target.closest('.picture');
    if (currentThumbnail) {
      evt.preventDefault();
      const id = Number(currentThumbnail.dataset.id);
      openFullSizePost(data[data.findIndex((elem) => elem.id === id)]);
    }
  };

  thumbnails.addEventListener('click', onThumbnailClick);
};

export {generateFullSizePost};

import {simularPhotoList} from './data.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const simularPhotoElement = simularPhotoList();

const simularPhotoListFragment = document.createDocumentFragment();

simularPhotoElement.forEach(({url, description, likes, comments}) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  simularPhotoListFragment.append(pictureItem);
});

picturesBlock.append(simularPhotoListFragment);

export {picturesBlock};

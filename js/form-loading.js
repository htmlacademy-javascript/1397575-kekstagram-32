import {isEscapeKey} from './util.js';
import './validation-form.js';

const inputLoadingFile = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const buttonClose = imageEditForm.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onButtonCloseClick);

  hashtagsInput.addEventListener('keydown', onInputKeydown);
  commentInput.addEventListener('keydown', onInputKeydown);
};

const closeEditForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  inputLoadingFile.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onButtonCloseClick);

  hashtagsInput.removeEventListener('keydown', onInputKeydown);
  commentInput.removeEventListener('keydown', onInputKeydown);
};

const onInputChange = () => {
  openEditForm();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditForm();
  }
}

function onButtonCloseClick() {
  closeEditForm();
}

function onInputKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}

inputLoadingFile.addEventListener('change', onInputChange);

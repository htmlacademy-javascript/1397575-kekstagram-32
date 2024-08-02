import {isEscapeKey} from './util.js';
import {validateForm} from './validation-form.js';
import {changeScale, resetScale} from './scale.js';
import {chooseEffectImage, destroySlider} from './effects.js';

const formLoading = document.querySelector('#upload-select-image');
const inputLoadingFile = formLoading.querySelector('#upload-file');
const imageEditForm = formLoading.querySelector('.img-upload__overlay');
const buttonClose = formLoading.querySelector('#upload-cancel');
const hashtagsInput = formLoading.querySelector('.text__hashtags');
const commentInput = formLoading.querySelector('.text__description');

const pristine = validateForm(formLoading);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Форма отправлена');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма не валидна');
  }
};

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  changeScale();
  chooseEffectImage();

  formLoading.addEventListener('submit', onFormSubmit);
  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onButtonCloseClick);

  hashtagsInput.addEventListener('keydown', onInputKeydown);
  commentInput.addEventListener('keydown', onInputKeydown);
};

const closeEditForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formLoading.reset();
  pristine.reset();

  resetScale();
  destroySlider();

  formLoading.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onButtonCloseClick);

  hashtagsInput.removeEventListener('keydown', onInputKeydown);
  commentInput.removeEventListener('keydown', onInputKeydown);
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

const onInputChange = () => {
  openEditForm();
};

inputLoadingFile.addEventListener('change', onInputChange);

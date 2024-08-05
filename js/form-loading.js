import {isEscapeKey} from './util.js';
import {validateForm} from './validation-form.js';
import {changeScale, resetScale} from './scale.js';
import {chooseEffectImage, destroySlider} from './effects.js';
import {sendData} from './api.js';
import {showErrorMessageSend, showSuccessMessageSend} from './message.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const formLoading = document.querySelector('#upload-select-image');
const inputLoadingFile = formLoading.querySelector('#upload-file');
const imageEditForm = formLoading.querySelector('.img-upload__overlay');
const buttonClose = formLoading.querySelector('#upload-cancel');
const hashtagsInput = formLoading.querySelector('.text__hashtags');
const commentInput = formLoading.querySelector('.text__description');
const submitButton = formLoading.querySelector('.img-upload__submit');

const hasOpenMessageError = () => Boolean(document.querySelector('.error'));

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const pristine = validateForm(formLoading);

const setOnFormSubmit = () => {
  const onFormSubmit = (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          closeEditForm();
          showSuccessMessageSend();
        })
        .catch(() => {
          showErrorMessageSend();
        })
        .finally(unblockSubmitButton);
    }
  };
  formLoading.addEventListener('submit', onFormSubmit);
};

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  changeScale();
  chooseEffectImage();

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onButtonCloseClick);

  hashtagsInput.addEventListener('keydown', onInputKeydown);
  commentInput.addEventListener('keydown', onInputKeydown);
};

function closeEditForm () {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formLoading.reset();
  pristine.reset();

  resetScale();
  destroySlider();

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onButtonCloseClick);

  hashtagsInput.removeEventListener('keydown', onInputKeydown);
  commentInput.removeEventListener('keydown', onInputKeydown);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hasOpenMessageError()) {
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

export {setOnFormSubmit};

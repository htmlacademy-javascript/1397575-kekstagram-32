import {isEscapeKey} from './util.js';
import {validateForm} from './validation-form.js';
import {changeScale, resetScale} from './scale.js';
import {chooseEffectImage, destroySlider} from './effects.js';
import {sendData} from './api.js';
import {showErrorMessageSend, showSuccessMessageSend} from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
const previewImage = formLoading.querySelector('.img-upload__preview img');

const isOpenMessageError = () => Boolean(document.querySelector('.error'));

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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isOpenMessageError()) {
    evt.preventDefault();
    closeEditForm();
  }
};

const onButtonCloseClick = () => {
  closeEditForm();
};

const onTextFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  changeScale();
  chooseEffectImage();

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onButtonCloseClick);

  hashtagsInput.addEventListener('keydown', onTextFieldKeydown);
  commentInput.addEventListener('keydown', onTextFieldKeydown);
};

function closeEditForm() {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formLoading.reset();
  pristine.reset();

  resetScale();
  destroySlider();

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onButtonCloseClick);

  hashtagsInput.removeEventListener('keydown', onTextFieldKeydown);
  commentInput.removeEventListener('keydown', onTextFieldKeydown);
}

const onInputChange = () => {
  const file = inputLoadingFile.files[0];
  const filename = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => filename.endsWith(it));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
    openEditForm();
  }
};

inputLoadingFile.addEventListener('change', onInputChange);

export {setOnFormSubmit};

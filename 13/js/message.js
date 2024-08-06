import {isEscapeKey} from './util.js';

const MESSAGE_SHOW_TIME = 5000;

const classTemplate = {
  ERROR_GET: 'data-error',
  SENT_SUCCESS: 'success',
  ERROR_SENT: 'error'
};

const showMessageTemplate = (type) => {
  const template = document.querySelector(`#${type}`).content.querySelector(`.${type}`).cloneNode(true);
  document.body.append(template);

  return template;
};

const createMessageSent = (type) => {
  const template = showMessageTemplate(type);
  const closeButton = template.querySelector(`.${type}__button`);

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);

  const hideMessage = () => {
    closeButton.addEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.removeEventListener('click', onBodyClick);
    template.remove();
  };

  function onCloseButtonClick () {
    hideMessage();
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hideMessage();
    }
  }

  function onBodyClick(evt) {
    if (!evt.target.closest(`.${type}__inner`)) {
      hideMessage();
    }
  }
};

const showErrorMessageGet = () => {
  const template = showMessageTemplate(classTemplate.ERROR_GET);
  setTimeout(() => {
    template.remove();
  }, MESSAGE_SHOW_TIME);
};

const showErrorMessageSend = () => createMessageSent(classTemplate.ERROR_SENT);
const showSuccessMessageSend = () => createMessageSent(classTemplate.SENT_SUCCESS);

export {showErrorMessageGet, showErrorMessageSend, showSuccessMessageSend};

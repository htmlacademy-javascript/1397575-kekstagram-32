import {isEscapeKey} from './util.js';

const MESSAGE_SHOW_TIME = 5000;

const TypeMessageGet = {
  ERROR: 'data-error'
};

const TypeMessageSent = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const showMessageTemplate = (type) => {
  const template = document.querySelector(`#${type}`).content.querySelector(`.${type}`).cloneNode(true);
  document.body.append(template);

  return template;
};

const createMessageSent = (type) => {
  const message = showMessageTemplate(type);
  const buttonCloseMessage = message.querySelector(`.${type}__button`);

  buttonCloseMessage.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);

  const hideMessage = () => {
    buttonCloseMessage.addEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.removeEventListener('click', onBodyClick);
    message.remove();
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
  const message = showMessageTemplate(TypeMessageGet.ERROR);
  setTimeout(() => {
    message.remove();
  }, MESSAGE_SHOW_TIME);
};

const showErrorMessageSend = () => createMessageSent(TypeMessageSent.ERROR);
const showSuccessMessageSend = () => createMessageSent(TypeMessageSent.SUCCESS);

export {showErrorMessageGet, showErrorMessageSend, showSuccessMessageSend};

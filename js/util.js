const isEscapeKey = (evt) => evt.key === 'Escape';

//функция для устранения дребезга
function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, debounce};

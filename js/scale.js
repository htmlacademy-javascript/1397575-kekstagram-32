const STEP_SCALE = 25;
const MIN_VALUE_SCALE = 25;
const MAX_VALUE_SCALE = 100;
const DEFAULT_COUNT = 100;
const DESIMAL_NOTATION = 10;
const FULL_PERCENT = 100;

const scaleControl = document.querySelector('.scale');
const buttonScaleUp = scaleControl.querySelector('.scale__control--smaller');
const buttonScaleDown = scaleControl.querySelector('.scale__control--bigger');
const scaleInput = scaleControl.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scaleInput.setAttribute('value', `${value}%`);
  previewImage.style.transform = `scale(${value / FULL_PERCENT})`;
};

const onScaleUpButtonClick = () => {
  const inputScaleValue = parseInt(scaleInput.value, DESIMAL_NOTATION); // получаем значение инпута без знака %
  if (inputScaleValue > MIN_VALUE_SCALE) {
    const currentInputValue = inputScaleValue - STEP_SCALE;
    scaleImage(currentInputValue);
  }
};

const onScaleDownButtonClick = () => {
  const inputScaleValue = parseInt(scaleInput.value, DESIMAL_NOTATION); // получаем значение инпута без знака %
  if (inputScaleValue < MAX_VALUE_SCALE) {
    const currentInputValue = inputScaleValue + STEP_SCALE;
    scaleImage(currentInputValue);
  }
};

const changeScale = () => {
  buttonScaleDown.addEventListener('click', onScaleDownButtonClick);
  buttonScaleUp.addEventListener('click', onScaleUpButtonClick);
};

const resetScale = () => {
  scaleImage(DEFAULT_COUNT);
  buttonScaleDown.removeEventListener('click', onScaleDownButtonClick);
  buttonScaleUp.removeEventListener('click', onScaleUpButtonClick);
};

export {changeScale, resetScale};

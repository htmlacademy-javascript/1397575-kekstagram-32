const STEP_SCALE = 25;
const MIN_VALUE_SCALE = 25;
const MAX_VALUE_SCALE = 100;
const DESIMAL_NOTATION = 10;
const FULL_PERCENT = 100;

const scaleControl = document.querySelector('.scale');
const buttonScaleUp = scaleControl.querySelector('.scale__control--smaller');
const buttonScaleDown = scaleControl.querySelector('.scale__control--bigger');
const scaleInput = scaleControl.querySelector('.scale__control--value');
const containerImage = document.querySelector('.img-upload__preview');
const imagePreview = containerImage.querySelector('img');

const onScaleUpButtonClick = () => {
  const inputScaleValue = parseInt(scaleInput.value, DESIMAL_NOTATION); // получаем значение инпута без знака %
  if (inputScaleValue > MIN_VALUE_SCALE) {
    const currentInputValue = inputScaleValue - STEP_SCALE;
    scaleInput.value = `${currentInputValue}%`;
    imagePreview.style.transform = `scale(${currentInputValue / FULL_PERCENT})`;
  }
};

const onScaleDownButtonClick = () => {
  const inputScaleValue = parseInt(scaleInput.value, DESIMAL_NOTATION); // получаем значение инпута без знака %
  if (inputScaleValue < MAX_VALUE_SCALE) {
    const currentInputValue = inputScaleValue + STEP_SCALE;
    scaleInput.value = `${currentInputValue}%`;
    imagePreview.style.transform = `scale(${currentInputValue / FULL_PERCENT})`;
  }
};

const changeScale = () => {
  buttonScaleDown.addEventListener('click', onScaleDownButtonClick);
  buttonScaleUp.addEventListener('click', onScaleUpButtonClick);
};

const setDefaultScaleValues = () => {
  scaleInput.value = `${MAX_VALUE_SCALE}%`;
  imagePreview.style.transform = `scale(${MAX_VALUE_SCALE / FULL_PERCENT})`;
  buttonScaleDown.removeEventListener('click', onScaleDownButtonClick);
  buttonScaleUp.removeEventListener('click', onScaleUpButtonClick);
};

export {changeScale, setDefaultScaleValues};

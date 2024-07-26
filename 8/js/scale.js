const STEP_SCALE = 25;
const MIN_VALUE_SCALE = 25;
const MAX_VALUE_SCALE = 100;

const scaleControl = document.querySelector('.scale');
const buttonSmaller = scaleControl.querySelector('.scale__control--smaller');
const buttonBigger = scaleControl.querySelector('.scale__control--bigger');
const inputScale = scaleControl.querySelector('.scale__control--value');
const containerImage = document.querySelector('.img-upload__preview');
const image = containerImage.querySelector('img');

buttonSmaller.addEventListener('click', () => {
  const inputScaleValue = Number(inputScale.value.slice(0,-1)); // получаем значение инпута без знака %
  if (inputScaleValue > MIN_VALUE_SCALE) {
    const currentInputValue = inputScaleValue - STEP_SCALE;
    inputScale.value = `${currentInputValue}%`;
    image.style.transform = `scale(${(currentInputValue) / 100})`;
  }
});

buttonBigger.addEventListener('click', () => {
  const inputScaleValue = Number(inputScale.value.slice(0,-1)); // получаем значение инпута без знака %
  if (inputScaleValue < MAX_VALUE_SCALE) {
    const currentInputValue = inputScaleValue + STEP_SCALE;
    inputScale.value = `${currentInputValue}%`;
    image.style.transform = `scale(${(currentInputValue) / 100})`;
  }
});

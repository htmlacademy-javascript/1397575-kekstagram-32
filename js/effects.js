const effectsName = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectsConfig = {
  [effectsName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [effectsName.CHROME]: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  [effectsName.SEPIA]: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  [effectsName.MARVIN]: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  [effectsName.PHOBOS]: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  [effectsName.HEAT]: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};

const sliderElement = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');

let currentEffect = effectsName.DEFAULT;

const setImageStyle = () => {
  if (currentEffect === effectsName.DEFAULT) {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = '';
  } else {
    sliderContainer.classList.remove('hidden');
    const {filter, unit} = effectsConfig[currentEffect];
    imagePreview.style.filter = `${filter}(${sliderInput.value}${unit})`;
  }
};

const onSliderUpdate = () => {
  sliderInput.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSliderElement = ({min, max, step}) => {
  noUiSlider.create(sliderElement, {
    range: {min, max},
    start: max,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = ({min, max, step}) => {
  sliderElement.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step: step
  });
};


const onEffectsListChange = (evt) => {
  const itemEffect = evt.target.closest('input[type="radio"]');

  if (itemEffect) {
    currentEffect = itemEffect.value;
    updateSlider(effectsConfig[currentEffect]);
    setImageStyle(effectsConfig[currentEffect]);
  }
};

const chooseEffectImage = () => {
  createSliderElement(effectsConfig[currentEffect]);
  setImageStyle();
  effectsList.addEventListener('change', onEffectsListChange);
};

const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
  imagePreview.style.filter = '';
  currentEffect = effectsName.DEFAULT;
  effectsList.removeEventListener('change', onEffectsListChange);
};

export {chooseEffectImage, destroySlider};

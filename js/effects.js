const EffectName = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const EffectConfig = {
  [EffectName.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [EffectName.CHROME]: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  [EffectName.SEPIA]: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  [EffectName.MARVIN]: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  [EffectName.PHOBOS]: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  [EffectName.HEAT]: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};

const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');

let currentEffect = EffectName.DEFAULT;
let isSliderInitialized = false;

const setImageStyle = () => {
  if (currentEffect === EffectName.DEFAULT) {
    sliderContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    sliderInput.value = '';
  } else {
    sliderContainer.classList.remove('hidden');
    const {filter, unit} = EffectConfig[currentEffect];
    imagePreview.style.filter = `${filter}(${sliderInput.value}${unit})`;
  }
  sliderInput.setAttribute('value', sliderInput.value);
};

const onSliderUpdate = () => {
  sliderInput.value = slider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({min, max, step}) => {
  if (!isSliderInitialized) {
    noUiSlider.create(slider, {
      range: {min, max},
      start: max,
      step,
      connect: 'lower',
      format: {
        to: (value) => Number(value),
        from: (value) => Number(value)
      }
    });
    isSliderInitialized = true;
  }

  slider.noUiSlider.on('update', onSliderUpdate);
};

const updateSlider = ({min, max, step}) => {
  slider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step: step
  });
};


const onEffectsListChange = (evt) => {
  const itemEffect = evt.target.closest('input[type="radio"]');

  if (itemEffect) {
    currentEffect = itemEffect.value;
    updateSlider(EffectConfig[currentEffect]);
    setImageStyle(EffectConfig[currentEffect]);
  }
};

const chooseEffectImage = () => {
  createSlider(EffectConfig[currentEffect]);
  setImageStyle();
  effectsList.addEventListener('change', onEffectsListChange);
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
  isSliderInitialized = false;
  imagePreview.style.filter = 'none';
  sliderInput.value = '';
  currentEffect = EffectName.DEFAULT;
  effectsList.removeEventListener('change', onEffectsListChange);
};

export {chooseEffectImage, destroySlider};

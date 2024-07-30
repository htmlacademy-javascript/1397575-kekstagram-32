const sliderElement = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');


const effectsConfig = {
  none: {
    min: 0,
    max: 100,
    step: 1
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1
  },
};

let currentEffect = 'none';

const createSliderElement = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: effectsConfig['none'].min,
      max: effectsConfig['none'].max
    },
    start: effectsConfig['none'].max,
    step: effectsConfig['none'].step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    if (currentEffect === 'none') {
      sliderContainer.classList.add('hidden');
      imagePreview.style.filter = '';
    } else {
      sliderContainer.classList.remove('hidden');
      const effectConfig = effectsConfig[currentEffect];
      sliderInput.value = Number(sliderElement.noUiSlider.get());
      imagePreview.style.filter = `${effectConfig.filter}(${sliderInput.value}${effectConfig.unit})`;
    }
  });
};

const onEffectsListChange = (evt) => {
  const itemEffect = evt.target.closest('input[type="radio"]');

  if (itemEffect) {
    currentEffect = itemEffect.value;

    const filterConfig = effectsConfig[currentEffect];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: filterConfig.min,
        max: filterConfig.max
      },
      start: filterConfig.max,
      step: filterConfig.step
    });
  }
};

const chooseEffectImage = () => {
  createSliderElement();
  effectsList.addEventListener('change', onEffectsListChange);
};

const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
  imagePreview.style.filter = '';
  currentEffect = 'none';
  effectsList.removeEventListener('change', onEffectsListChange);
};

export {chooseEffectImage, destroySlider};

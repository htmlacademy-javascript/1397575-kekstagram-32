const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT_HASHTAGS = 5;

const formUpload = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const prestine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateCommentMaxLength = (value) => value.length <= MAX_LENGTH_COMMENT;

prestine.addValidator(
  commentInput,
  validateCommentMaxLength,
  'длина комментария больше 140 символов'
);

const validateInvalidHastag = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(' ');
  const etalonHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtags.every((hashtag) => etalonHashtag.test(hashtag));
};

const validateAmountHastag = (value) => {
  const hashtags = value.trim().split(' ');
  return hashtags.length <= MAX_COUNT_HASHTAGS;
};

const validateRepeatHastag = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

prestine.addValidator(
  hashtagsInput,
  validateInvalidHastag,
  'введён невалидный хэштег'
);

prestine.addValidator(
  hashtagsInput,
  validateAmountHastag,
  'превышено количество хэштегов'
);

prestine.addValidator(
  hashtagsInput,
  validateRepeatHastag,
  'хэштеги повторяются'
);

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = prestine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Форма отправлена');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма не валидна');
  }
});

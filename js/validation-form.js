const MAX_COUNT_HASHTAGS = 5;
const ETALON_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_MESSAGE = {
  ISVALID: 'введён невалидный хэштег',
  MAXCOUNT: `превышено количество хэштегов, максимальное количество - ${MAX_COUNT_HASHTAGS}`,
  REPEAT: 'хэштеги повторяются'
};

const hashtagsInput = document.querySelector('.text__hashtags');

const validateForm = (form) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  const createArrayHastags = (stringHashtags) => stringHashtags.trim().split(' ');

  const isInvalidHastag = (value) => {
    if (!value) {
      return true;
    }
    return createArrayHastags(value).every((hashtag) => ETALON_HASHTAG.test(hashtag));
  };

  const checkAmountHastag = (value) => createArrayHastags(value).length <= MAX_COUNT_HASHTAGS;

  const isRepeatHastag = (value) => {
    const hashtags = createArrayHastags(value).map((tag) => tag.toLowerCase());
    const uniqueHashtags = new Set(hashtags);
    return uniqueHashtags.size === hashtags.length;
  };

  pristine.addValidator(
    hashtagsInput,
    isInvalidHastag,
    ERROR_MESSAGE.ISVALID
  );

  pristine.addValidator(
    hashtagsInput,
    checkAmountHastag,
    ERROR_MESSAGE.MAXCOUNT
  );

  pristine.addValidator(
    hashtagsInput,
    isRepeatHastag,
    ERROR_MESSAGE.REPEAT
  );

  return pristine;
};

export {validateForm};

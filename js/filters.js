const SIMULAR_THUMBNAILS_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filter = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;

const getCountComment = ({comments}) => comments.length;

const compareCountComments = (pictureA, pictureB) => {
  const commentsA = getCountComment(pictureA);
  const commentsB = getCountComment(pictureB);

  return commentsB - commentsA;
};

const sortByComment = (arrayPictures) => [...arrayPictures].sort(compareCountComments);

const sortRandomly = () => Math.random() - 0.5;

const rundomPictures = (arrayPictures) => [...arrayPictures].sort(sortRandomly).slice(0, SIMULAR_THUMBNAILS_COUNT);

//функция возвращает отсортированный массив
const getSortedPictures = (arrayPictures, choosenFilter) => {
  if (choosenFilter === Filter.DEFAULT) {
    return [...arrayPictures];
  }
  if (choosenFilter === Filter.DISCUSSED) {
    return sortByComment(arrayPictures);
  }
  if (choosenFilter === Filter.RANDOM) {
    return rundomPictures(arrayPictures);
  }
};

//получение массива в зависимости от выбранного фильтра
const showFilteredRictures = (arrayPictures, cb) => {
  filter.classList.remove('img-filters--inactive');
  currentFilter = Filter.DEFAULT;

  filter.addEventListener('click', (evt) => {
    currentFilter = evt.target.closest('.img-filters__button');
    if (currentFilter) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      currentFilter.classList.add('img-filters__button--active');
      const nameFilter = currentFilter.id;
      const sortedArray = getSortedPictures(arrayPictures, nameFilter);
      cb(sortedArray);
    }
  });
};

export {showFilteredRictures};

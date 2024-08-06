import {getUniqueRandomId} from './util.js';

const SIMULAR_THUMBNAILS_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filter = document.querySelector('.img-filters');

const getCountComment = ({comments}) => comments.length;

const compareCountComments = (a, b) => {
  const commentsA = getCountComment(a);
  const commentsB = getCountComment(b);

  return commentsB - commentsA;
};

const sortComment = (data) => [...data].sort(compareCountComments);

const rundomPicture = (data) => {
  const rundom = getUniqueRandomId(1, data.length);
  const dataPostGenetation = () => {
    const id = rundom();

    return data[id - 1];
  };
  return Array.from({length: SIMULAR_THUMBNAILS_COUNT}, dataPostGenetation);
};

const sortPicture = (data, choosenFilter) => {
  if (choosenFilter === Filter.DEFAULT) {
    return data;
  }
  if (choosenFilter === Filter.DISCUSSED) {
    return sortComment(data);
  }
  if (choosenFilter === Filter.RANDOM) {
    return rundomPicture(data);
  }
};

const showFilterRicture = (data, cb) => {
  filter.classList.remove('img-filters--inactive');
  filter.addEventListener('click', (evt) => {
    const currentFilter = evt.target.closest('.img-filters__button');
    if (currentFilter) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      currentFilter.classList.add('img-filters__button--active');
      const nameFilter = currentFilter.id;
      const sort = sortPicture(data, nameFilter);
      cb(sort);
    }
  });
};


export {showFilterRicture};

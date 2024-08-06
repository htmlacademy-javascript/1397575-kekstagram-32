import {generateThumbnails} from './thumbnails.js';
import {generateFullSizePost} from './full-size-mode.js';
import {getData} from './api.js';
import {showErrorMessageGet} from './message.js';
import {setOnFormSubmit} from './form-loading.js';
import {showFilterRicture} from './sort.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((pictures) => {
    generateThumbnails(pictures);
    generateFullSizePost(pictures);
    showFilterRicture(pictures, debounce(generateThumbnails, RERENDER_DELAY));
  })
  .catch(() => {
    showErrorMessageGet();
  });

setOnFormSubmit();


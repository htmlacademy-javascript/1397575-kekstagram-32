import {generateThumbnails} from './thumbnails.js';
import {generateFullSizePost} from './full-size-mode.js';
import {getData} from './api.js';
import {showErrorMessageGet} from './message.js';
import {setOnFormSubmit} from './form-loading.js';

getData()
  .then((pictures) => {
    generateThumbnails(pictures);
    generateFullSizePost(pictures);
  })
  .catch(() => {
    showErrorMessageGet();
  });

setOnFormSubmit();

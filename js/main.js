import {simularPhotoList} from './data.js';
import {generateThumbnails} from './thumbnails.js';
import {generateFullSizePost} from './full-size-mode.js';

const photoList = simularPhotoList();
generateThumbnails(photoList);
generateFullSizePost(photoList);


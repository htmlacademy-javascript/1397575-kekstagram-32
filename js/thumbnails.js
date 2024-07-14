const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const generateThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const pictureItem = createThumbnail(picture);
    pictureListFragment.append(pictureItem);
  });
  picturesBlock.append(pictureListFragment);
};

export {generateThumbnails};

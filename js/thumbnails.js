const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();

const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.dataset.id = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const clearThumbnailsList = () => {
  const pictureList = document.querySelectorAll('.picture');
  pictureList.forEach((picture) => {
    picture.remove();
  });
};

const generateThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const pictureItem = createThumbnail(picture);
    pictureListFragment.append(pictureItem);
  });
  clearThumbnailsList();
  picturesBlock.append(pictureListFragment);
};

export {generateThumbnails};
